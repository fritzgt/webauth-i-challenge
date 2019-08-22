//1. Importing bcrypt library
const bcrypt = require('bcryptjs');

//Importing model
const Users = require('../model/users-model.js');

module.exports = function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findByUser(username)
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'You shall not pass!' });
        }
      });
  } else {
    //if user dont provide credntials
    res.status(400).json({ message: 'Provide valid crendstials' });
  }
};
