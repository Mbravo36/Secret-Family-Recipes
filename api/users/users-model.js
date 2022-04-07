const db = require('../../data/db-config');

module.exports = {
    find,
    findById,
    findBy,
    add
}

function find() {
    return db('users')
}

function findById(user_id) {
    return db('users')
        .where('users.user_id', user_id)
        .first()
}

function findBy(filter) {
    return db('users')
     .select('username', 'password')
     .where(filter)
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}