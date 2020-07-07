const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const usersModel = require('../models/users-model')

router.post('/register', async (req, res, next) => {
    const userInfo = req.body
    try {
        if(!userInfo.username || !userInfo.password || !userInfo.user_type) {
            return res.status(400).json({
                message: 'req body needs username, password, and usertype'
            })
        }

        if(userInfo.user_type === 'customer' || userInfo.user_type === 'store' || userInfo.user_type === 'deliverer') {
            const userExists = await usersModel.findBy({ username: userInfo.username })
            if (userExists) {
                return res.status(400).json({
                    message: 'that username is already taken'
                })
            }
    
            const newUser = await usersModel.addUser(userInfo)

            const tokenPayload = {
                userId: newUser.id
            }
    
            const userToken = jwt.sign(tokenPayload, process.env.JWT_SECRET)
            res.json({
                message: `welcome ${newUser.username}`,
                token: userToken,
                userId: userExists.id
            })

        } else {
            return res.status(400).json({
                message: 'usertype must be customer, store, or deliverer'
            })
        }

    } catch(err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    const authErr = {
        message: 'invalid credentials'
    }

    try {
        const userInfo = req.body
        if (!userInfo.username || !userInfo.password) {
            return res.status(400).json(authErr)
        }

        const userExists = await usersModel.findBy({ username: userInfo.username })
        if (!userExists) {
            return res.status(400).json(authErr)
        }

        const validPassword = await bcrypt.compare(userInfo.password, userExists.password)
        if(!validPassword) {
            return res.status(401).json(authErr)
        }

        const tokenPayload = {
            userId: userExists.id
        }

        const userToken = jwt.sign(tokenPayload, process.env.JWT_SECRET)
        res.json({
            message: `welcome ${userExists.username}`,
            token: userToken,
            userId: userExists.id
        })

    } catch(err) {
        next(err)
    }
})

module.exports = router