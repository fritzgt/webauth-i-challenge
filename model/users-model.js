const db = require('../database/db-config');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('users');
}

function findById(id) {}

function add(user) {}

function update(changes, id) {}

function remove(id) {}
