const db = require('../data/config')
const bcrypt = require('bcryptjs')

function findUsers() {
    return db('users')
}

function findById(id) {
    return db('users').where({id}).first()
}

function findBy(filter) {
    return db('users').where(filter).first()
}

async function addUser(user) {
    user.password = await bcrypt.hash(user.password, 12)
    const [id] = await db('users').insert(user).returning('id')
    return await findById(id)
}

async function updateUser(id, user) {
    await db('users').where({id}).update(user)
    return findById(id)
}

function deleteUser(id) {
    db('users').where({id}).del()
}

module.exports = {
    findUsers,
    findById,
    findBy,
    addUser,
    updateUser,
    deleteUser
}