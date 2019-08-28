const express = require('express');

//implementing routing
const router = express.Router();

//importin bcrypt
const bcrypt = require('bcryptjs');

//importing db
const users = require('../model/users-model.js');

//Importing custom middleware
const restricted = require('../auth/restricted-middleware.js');

//post new users
router.post('/register', async (req, res) => {
  const newUser = req.body;

  //Implementing bcrypt
  const hash = bcrypt.hashSync(newUser.password, 14);

  //setting the new hash as the password
  newUser.password = hash;

  try {
    const data = await users.add(newUser);

    if (!newUser.username) {
      res.status(401).json({
        message: 'Please provide a username and password!'
      });
    } else {
      res.status(200).json({
        message: `Hello ${newUser.username}, your are  now registered!`
      });
    }
  } catch (err) {
    if (err.errno == 19) {
      res.status(400).json({ message: 'username is not available!' });
    } else {
      res.status(500).json({ err });
    }
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
      //Passing the user object to the session or
      //to prevent passing sensetive data we can pass a boolean
      //since the middleware is only checking for truthiness not
      //comparing agains the db in this case
      req.session.user = true;
      res.status(200).json({ message: 'Logged in!' });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch {
    res.status(500).json({ message: 'Cannot connect to server' });
  }
});

//Logout

router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: 'You cannot log out!' });
      } else {
        res.status(200).json({ message: 'Thank you for visiting!' });
      }
    });
  } else {
    res.status(200).json({ message: 'You were nefver here to begin with' });
  }
});

//get users
//Passing a custome middleware to check
// if user is currently logged in
router.get('/users', restricted, async (req, res) => {
  try {
    const data = await users.find();
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: 'Cannot connect to server' });
  }
});

module.exports = router;
