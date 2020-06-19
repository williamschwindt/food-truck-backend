const express = require('express')
const router = express.Router()
const usersModel = require('../models/users-model')
const restrict = require('../middleware/restrict')

router.get('/', restrict(), async(req, res, next) => {
    try{
       const users = await usersModel.findUsers()
       res.json(users)

    } catch(err) {
        next(err)
    }
})

router.get('/:id', restrict(), async(req, res, next) => {
    try{
        const user = await usersModel.findById(req.params.id)
        if(!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        res.json(user)
        
    } catch(err) {
        next(err)
    }
})

router.put('/:id', restrict(), async(req, res, next) => {
    try{
        const user = await usersModel.findById(req.params.id)
        if(!user) {
            return res.status(404),json({
                message: 'user not found'
            })
        }
        const updatedUser = await usersModel.updateUser(req.params.id, req.body)
        res.json(updatedUser)
        
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', restrict(), async(req, res, next) => {
    try{
        const user = await usersModel.findById(req.params.id)
        if(!user) {
            return res.status(404),json({
                message: 'user not found'
            })
        }
        await usersModel.deleteUser(req.params.id)
        res.status(204).end()

        
    } catch(err) {
        next(err)
    }
})

module.exports = router