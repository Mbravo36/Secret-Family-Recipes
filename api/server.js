const express = require('express');
const cors = require('cors');

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const postRouter = require('./posts/posts-router');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/posts', postRouter);

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
});

module.exports = server;