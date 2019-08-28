const db = require('../database/db-config.js');

module.exports = {
  find,
  findById,
  findByUser,
  add,
  update,
  remove
};

function find() {
  return db.select('id', 'username').from('users');
}

function findById(id) {}

function findByUser(username) {
  return db('users')
    .where('username', '=', username)
    .first();
}

function add(newUser) {
  return db('users').insert(newUser);
}

function update(changes, id) {}

function remove(id) {}
