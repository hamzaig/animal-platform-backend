const app = require('express').Router();
const { signUp, login, logout, recover } = require('../../controller/auth');
const auth = require('../../middleware/auth');
const Validator = require('../../middleware/validator');
const {
	signupValidation,
	loginValidation,
	recoverValidation,
} = require('./validate');

app.post('/sign-up', Validator(signupValidation, 'body'), signUp);
app.post('/login', Validator(loginValidation, 'body'), login);
app.post('/recover', Validator(recoverValidation, 'body'), recover);
app.post('/logout', auth, logout);

module.exports = app;
