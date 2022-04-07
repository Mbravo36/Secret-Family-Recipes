const db = require('../../data/db-config');

function find() {
    return db('posts')
}

function findBy(filter) {
    return db('posts')
    .where(filter)
}

function findById(post_id) {
    return db('posts')
    .where('posts.post_id', post_id).first()
}

async function add(post) {
    const [id] = await db('posts').insert(post);
    return findById(id);
}

async function remove(post_id) {
    const deleted = await db('posts')
    .where('post_id', post_id)
    .returning('title')
    .del()

    return deleted
}

async function edit(post_id, changes) {
   return await db('posts')
    .where('post_id', post_id)
    .update(changes)
}

module.exports = {
    add, 
    find, 
    findBy,
    findById,
    remove,
    edit
}