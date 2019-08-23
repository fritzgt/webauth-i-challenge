const express = require('express');
//Importing session
const session = require('express-session');

const server = express();

// configure express-session middleware
const sessionConfig = {
  name: 'notsession', //for security dont specify we’re using this library
  secret: 'nobody tosses a dwarf!',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false // only set cookies over https. Server will not send back a cookie over http. ok to be false during development
  }, // 1 day in milliseconds
  httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
  resave: false,
  saveUninitialized: false
};

//Initializing session middleware
server.use(session(sessionConfig));
//json middleware
server.use(express.json());

//importin CRUD Router
const usersRouter = require('./usersRouter/usersRouter.js');

//Use router
server.use('/api', usersRouter);

server.use('/', (req, res) => {
  res.status(200).send('Hello world!');
});

module.exports = server;
