require('express-async-errors');
const app = require('express').Router();
const { error } = require('../middleware/error');

app.use('/auth', require('./auth'));

app.use(error);

module.exports = app;
