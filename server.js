/**
 * Node Modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

/**
 * Local Modules
 */
const habitApiRoutes = require('./api/habit/habit.routes');

/**
 * Express + Middeware
 */
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/api/habits', habitApiRoutes);

module.exports = server;
