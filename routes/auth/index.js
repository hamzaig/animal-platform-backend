const app = require('express').Router();

app.post('/sign-up', (req, res) => res.send('ok'));

module.exports = app;
