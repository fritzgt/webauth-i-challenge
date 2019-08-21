const express = require('express');

//implementing routing
const router = express.Router();

//importing db
const users = require('../model/users-model.js');

//get users
router.get('/users', async (req, res) => {
  try {
    const data = await users.find();
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ err });
  }
});

module.exports = router;
