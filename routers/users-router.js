const express = require('express')
const router = express.Router()
const usersModel = require('../models/users-model')
const storesModel = require('../models/stores-model')
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

router.post('/:id/stores', restrict(), async (req, res, next) => {
    try {
        if(!req.body.store_name || !req.body.store_address || !req.body.city_state) {
            res.status(400).json({
                message: 'req body needs store_name, store_address, and city_state'
            })
        }

        const formattedBody = {
            store_name: req.body.store_name.toLowerCase(),
            store_address: req.body.store_address.toLowerCase(),
            city_state: req.body.city_state.toLowerCase(),
        }

        const storeExists = await storesModel.getByAddress(formattedBody.store_address)
        if(storeExists) {
            return res.status(400).json({
                message: 'a store at that address already exists'
            })
        }

        const store = await storesModel.addStore(req.params.id, formattedBody)
        res.json(store)

    } catch(err) {
        next(err)
    }
})

router.get('/:id/stores', async (req, res, next) => {
    try {
        const stores = await storesModel.getByUserId(req.params.id)
        return res.json(stores)

    } catch(err) {
        next(err)
    }
})

module.exports = router