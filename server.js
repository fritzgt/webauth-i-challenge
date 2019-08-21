const express = require('express');

const server = express();

server.use(express.json());

//Use router
// server.use('/anyroute', userRouter);

server.use('/', (req, res) => {
  res.status(200).send('Hello world!');
});

module.exports = server;
