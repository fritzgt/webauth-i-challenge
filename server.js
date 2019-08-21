const express = require('express');

const server = express();

server.use(express.json());

//importin CRUD Router
const usersRouter = require('./usersRouter/usersRouter.js');

//Use router
server.use('/api', usersRouter);

server.use('/', (req, res) => {
  res.status(200).send('Hello world!');
});

module.exports = server;
