const app = require('express').Router();

app.use('/auth', require('./auth'));
app.use('/profile-setting', require('./profile-setting'));

module.exports = app;
