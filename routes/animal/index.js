const app = require('express').Router();
const auth = require('../../middleware/auth');
const Validator = require('../../middleware/validator');
const {
	createAnimalSchema,
	updateAnimalAddionalDataSchema,
	updateAnimalDataSchema,
	updateAnimalMedicationAndBehaviorSchema,
	addVaccinationSchema,
	addWeightSchema,
} = require('./validate');
const {
	addAnimal,
	updateAnimalData,
	updateAnimalAdditionalData,
	updateAnimalMedicationAndBehaviorData,
	addVaccination,
	deleteVaccination,
	addWeight,
	deleteWeight,
	addImage,
	getAllAnimals,
	getAnimalById,
} = require('../../controller/animal');

app.post('/', auth, Validator(createAnimalSchema, 'body'), addAnimal);
app.get('/', auth, getAllAnimals);
app.get('/:animalId', auth, getAnimalById);
app.post('/image-upload/:animalId', auth, addImage);

app.put(
	'/update-animal-data/:animalId',
	auth,
	Validator(updateAnimalDataSchema, 'body'),
	updateAnimalData
);
app.put(
	'/update-animal-addional-data/:animalId',
	auth,
	Validator(updateAnimalAddionalDataSchema, 'body'),
	updateAnimalAdditionalData
);
app.put(
	'/update-animal-medication-behavior-data/:animalId',
	auth,
	Validator(updateAnimalMedicationAndBehaviorSchema, 'body'),
	updateAnimalMedicationAndBehaviorData
);

app.post(
	'/vaccination/:animalId',
	auth,
	Validator(addVaccinationSchema, 'body'),
	addVaccination
);

app.delete('/vaccination/:animalId/:vaccinationId', auth, deleteVaccination);

app.post(
	'/weight/:animalId',
	auth,
	Validator(addWeightSchema, 'body'),
	addWeight
);

app.delete('/weight/:animalId/:weightId', auth, deleteWeight);

module.exports = app;
