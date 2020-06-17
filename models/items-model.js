const db = require('../data/config')

function getItems() {
    return db('items')
}

function getById(id) {
    return db('items').where({id}).first()
}

function getBy(filter) {
    return db('items').where(filter)
}

function getByStore(store_id) {
    return db('stores_items as si')
    .join('stores as s', 's.id', 'si.store_id')
    .join('items as i', 'i.id', 'si.item_id')
    .where('si.store_id', store_id)
    .select(
        's.id as store_id',
        'i.id as item_id',
        'i.name as item_name',
        'i.price as item_price'
    )
}

async function addStoreItem(store_id, item) {
    const [id] = await db('items').insert(item).returning('id')
    const addedItem = await getById(id)
    await db('stores_items').insert({
        store_id: store_id,
        item_id: id
    })
    return addedItem
}

async function addItem(store_id, item_id) {
    await db('stores_items').insert({
        store_id: store_id,
        item_id: item_id
    })

    return getById(item_id)
}

async function updateItem(id, item) {
    await db('item').where({id}).update(item)
    return getById(id)
}

function deleteItem(id) {
    return db('items').where({id}).del()
}

module.exports = {
    getItems,
    getById,
    getBy,
    getByStore,
    addStoreItem,
    addItem,
    updateItem,
    deleteItem
}

