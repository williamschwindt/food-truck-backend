const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const usersModel = require('../models/users-model')

router.post('/register', async (req, res, next) => {
    const userInfo = req.body
    try {
        const userExists = await usersModel.findBy({ username: userInfo.username })
        if (userExists) {
            return res.status(400).json({
                message: 'that username is already taken'
            })
        }

        const newUser = await usersModel.addUser(userInfo)
        res.status(201).json(newUser)

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
            res.status(401).json(authErr)
        }

        const tokenPayload = {
            userId: userExists.id
        }

        const userToken = jwt.sign(tokenPayload, process.env.JWT_SECRET)
        res.json({
            message: `welcome ${userExists.name}`,
            token: userToken
        })

    } catch(err) {
        next(err)
    }
})

module.exports = router