const express = require('express');

//implementing routing
const router = express.Router();

//importin bcrypt
const bcrypt = require('bcryptjs');

//importing db
const users = require('../model/users-model.js');

//post new users
router.post('/register', async (req, res) => {
  const newUser = req.body;

  //Implementing bcrypt
  const hash = bcrypt.hashSync(newUser.password, 14);

  //setting the new hash as the password
  newUser.password = hash;

  try {
    const data = await users.add(newUser);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: 'Cannot connect to server' });
  }
});

//Login current user
router.post('/login', async (req, res) => {
  //Deconstructing body
  const { username, password } = req.body;
  try {
    //check if the username exist to gain access to the password in db
    const user = await users.findByUser(username);
    //if statement checks if the username exist and
    //if the password matches the one in the db using bcrypt
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: 'Logged in!' });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch {
    res.status(500).json({ message: 'Cannot connect to server' });
  }
});

//get users
router.get('/users', async (req, res) => {
  try {
    const data = await users.find();
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: 'Cannot connect to server' });
  }
});

module.exports = router;
