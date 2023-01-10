const app = require('express').Router();
const {
	addVaccination,
	deleteVaccination,
} = require('../../../controller/animal/vaccination');
const auth = require('../../../middleware/auth');
const Validator = require('../../../middleware/validator');
const { addVaccinationSchema } = require('./validate');

app.post('/', auth, Validator(addVaccinationSchema, 'body'), addVaccination);
app.delete('/:vaccinationId', auth, deleteVaccination);

module.exports = app;
