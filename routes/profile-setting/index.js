const app = require('express').Router();
const {
	updatePersonalInformation,
} = require('../../controller/profile-setting');
const auth = require('../../middleware/auth');
const Validator = require('../../middleware/validator');
const { updatePersonalInformationSchema } = require('./validate');

app.put(
	'/personal-information/:clientId',
	auth,
	Validator(updatePersonalInformationSchema, 'body'),
	updatePersonalInformation
);

module.exports = app;
