const app = require('express').Router();

app.use('/auth', require('./auth'));
app.use('/profile-setting', require('./profile-setting'));
app.use('/animal', require('./animal'));

module.exports = app;
