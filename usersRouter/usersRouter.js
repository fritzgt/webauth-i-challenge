const express = require('express');

//implementing routing
const router = express.Router();

//importing db
const users = require('../model/users-model.js');

//post new users
router.post('/register', async (req, res) => {
  const newUser = req.body;
  try {
    const data = await users.add(newUser);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: 'Cannot connect to server' });
  }
});

//Login current user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await users.findByUser(username);
    res.status(200).json({ data });
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
