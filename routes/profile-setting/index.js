const app = require('express').Router();
const auth = require('../../middleware/auth');
const Validator = require('../../middleware/validator');
const {
	updatePersonalInformationSchema,
	updateVeterinarianInformationSchema,
	updateEmergenciesInformationSchema,
	updateFinancialInformationSchema,
} = require('./validate');
const {
	updatePersonalInformation,
	updateVeterinarianInformation,
	updateEmergenciesInformation,
	getClientInformation,
	updateFinancialInformation,
} = require('../../controller/profile-setting');

app.put(
	'/personal-information',
	auth,
	Validator(updatePersonalInformationSchema, 'body'),
	updatePersonalInformation
);

app.put(
	'/veterinarian-information',
	auth,
	Validator(updateVeterinarianInformationSchema, 'body'),
	updateVeterinarianInformation
);

app.put(
	'/emergencies-information',
	auth,
	Validator(updateEmergenciesInformationSchema, 'body'),
	updateEmergenciesInformation
);

app.put(
	'/financial-information',
	auth,
	Validator(updateFinancialInformationSchema, 'body'),
	updateFinancialInformation
);

app.get('/profile-information', auth, getClientInformation);

module.exports = app;
