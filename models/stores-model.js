const db = require('../data/config')

function getStores() {
    return db('stores')
}

function getById(id) {
    return db('stores').where({id}).first()
}

function getBy(filter) {
    return db('stores').where(filter)
}

function getByAddress(adress) {
    return db('stores').where('store_address', adress).first()
}

async function addStore(store) {
    const [id] = await db('stores').insert(store).returning('id')
    return getById(id)
}

async function updateStore(id, store) {
    await db('stores').where({id}).update(store)
    return getById(id)
}

function deleteStore(id) {
    return db('stores').where({id}).del()
}

module.exports = {
    getStores,
    getById,
    getBy,
    getByAddress,
    addStore,
    updateStore,
    deleteStore
}

