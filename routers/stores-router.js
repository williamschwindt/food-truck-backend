const express = require('express')
const storesModel = require('../models/stores-model')
const itemsModel = require('../models/items-model')
const db = require('../data/config')
const router = express.Router()
const restrict = require('../middleware/restrict')

router.get('/', restrict(), async (req, res, next) => {
    try {
        const stores = await storesModel.getStores()
        res.json(stores)

    } catch(err) {
        next(err)
    }
})

router.get('/:id', restrict(), async (req, res, next) => {
    try {
        const store = await storesModel.getById(req.params.id)
        if(!store) {
            res.status(404).json({
                message: 'store not found'
            })
        }
        res.json(store)

    } catch(err) {
        next(err)
    }
})

router.get('/address/:address', restrict(), async (req, res, next) => {
    try {
        const store = await storesModel.getByAddress(req.params.address)
        if(!store) {
            res.status(404).json({
                message: 'a store with that address was not found'
            })
        }
        res.json(store)

    } catch(err) {
        next(err)
    }
})

router.get('/citystate/:citystate', restrict(), async (req, res, next) => {
    try {
        const stores = await storesModel.getBy({'city_state': req.params.citystate})
        if(stores.length == 0) {
            return res.status(404).json({
                message: `no stores in ${req.params.citystate} were found`
            })
        }
        res.json(stores)

    } catch(err) {
        next(err)
    }
})

router.put('/:id', restrict(), async (req, res, next) => {
    try {
        const store = await storesModel.getById(req.params.id)
        if(!store) {
            res.status(404).json({
                message: 'store not found'
            })
        }

        for(let el in req.body) {
            req.body[el] = req.body[el].toLowerCase()
            console.log(req.body[el])
        }

        const newStore = await storesModel.updateStore(req.params.id, req.body)
        res.json(newStore)

    } catch(err) {
        next(err)
    }
})

router.delete('/:id', restrict(), async (req, res, next) => {
    try {
        const store = await storesModel.getById(req.params.id)
        if(!store) {
            res.status(404).json({
                message: 'store not found'
            })
        }
        await storesModel.deleteStore(req.params.id)
        res.status(204).end()

    } catch(err) {
        next(err)
    }
})

router.get('/:id/items', restrict(), async (req, res, next) => {
    try {
        const store = await storesModel.getById(req.params.id)
        if(!store) {
            return res.status(404).json({
                message: 'store not found'
            })
        }
        const items = await itemsModel.getByStore(req.params.id)
        res.json(items)

    } catch(err) {
        next(err)
    }
})

router.post('/:id/items', restrict(), async (req, res, next) => {
    try {
        if(!req.body.name || !req.body.price) {
            return res.status(400).json({
                message: 'req body needs name and price'
            })
        }
        const store = await storesModel.getById(req.params.id)
        if(!store) {
            return res.status(404).json({
                message: 'store not found'
            })
        }

        const itemExists = await itemsModel.getBy({'name': req.body.name}).first()
        if(itemExists) {
            const storeItem = await db('stores_items').where('store_id', req.params.id).andWhere('item_id', itemExists.id).first()
            if (storeItem) {
                return res.status(400).json({
                    message: `that store already has ${itemExists.name}`
                })
            }
            
            const addedItem = await itemsModel.addItem(req.params.id, itemExists.id)
            return res.json(addedItem)
        }
        
        const addedItem = await itemsModel.addStoreItem(req.params.id, req.body)
        res.json(addedItem)

    } catch(err) {
        next(err)
    }
})

module.exports = router