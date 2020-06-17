const express = require('express')
const itemsModel = require('../models/items-model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try{
        const items = await itemsModel.getItems()
        res.json(items)

    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const item = await itemsModel.getById(req.params.id)
        if(!item) {
            res.status(404).json({
                message: 'item not found'
            })
        }
        res.json(item)

    } catch(err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const item = await itemsModel.getById(req.params.id)
        if(!item) {
            return res.status(404).json({
                message: 'item not found'
            })
        }
        const updatedItem = await itemsModel.updateItem(req.params.id, req.body)
        res.json(updatedItem)

    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const item = await itemsModel.getById(req.params.id)
        if(!item) {
            return res.status(404).json({
                message: 'item not found'
            })
        }
        await itemsModel.deleteItem(req.params.id)
        res.status(204).end()

    } catch(err) {
        next(err)
    }
})

module.exports = router