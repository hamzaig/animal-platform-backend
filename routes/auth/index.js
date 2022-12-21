const app = require('express').Router();
const {
	signUp,
	login,
	logout,
	recover,
	reset,
	resetPassword,
} = require('../../controller/auth');
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
app.get('/reset/:token', reset);
app.post('/reset-password', resetPassword);
app.post('/logout', auth, logout); //

module.exports = app;
