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

function getByAddress(address) {
    return db('stores').where('store_address', address).first()
}

function getByUserId(userId) {
    return db('stores_users as su')
        .join('stores as s', 's.id', 'su.store_id')
        .join('users as u', 'u.id', 'su.user_id')
        .where('su.user_id', userId)
        .select(
            'u.id as user_id',
            's.id as store_id',
            's.store_name',
            's.store_address',
            's.city_state'
        )
}

async function addStore(userId, store) {
    const [id] = await db('stores').insert(store).returning('id')
    const addedStore = await getById(id)
    await db('stores_users').insert({
        'store_id': id,
        'user_id': userId
    })
    return addedStore
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
    getByUserId,
    addStore,
    updateStore,
    deleteStore
}

