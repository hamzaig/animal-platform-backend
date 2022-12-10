const app = require('express').Router();

app.post('/sign-up', (req, res) => res.send('ok working'));

module.exports = app;
