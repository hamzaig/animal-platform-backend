const { default: mongoose } = require('mongoose');
const { Animal } = require('../../models/Animal');
const { uploadBase64S3 } = require('../../utils/aws');

const addAnimal = async (req, res) => {
	const {
		name,
		species,
		chipNumber,
		race,
		dob,
		sex,
		size,
		color,
		behaviorAtHome,
		behaviorTowardsOtherAnimals,
		animalInSeparateAccomedation,
		neuteredOrSterilised,
		hasTheAnimalChemicallyCastrated,
		additionalInformationAboutCastrationOrSterilization,
		additionalInformationAboutChemicalCastration,
		informationAboutMedicationUse,
		feedInformation,
	} = req.body;
	const animal = await new Animal({
		client: req.clientId,
		name,
		species,
		chipNumber,
		race,
		dob,
		sex,
		size,
		color,
		behaviorAtHome,
		behaviorTowardsOtherAnimals,
		animalInSeparateAccomedation,
		neuteredOrSterilised,
		hasTheAnimalChemicallyCastrated,
		additionalInformationAboutCastrationOrSterilization,
		additionalInformationAboutChemicalCastration,
		informationAboutMedicationUse,
		feedInformation,
	});
	await animal.save();
	return res.send({ animal, message: 'succesvol aangemaakt.' });
};

const addImage = async (req, res) => {
	const { clientId } = req;
	const { animalId } = req.params;
	const { image } = req.body;
	if (!image) {
		return res.status(400).send({ error: 'Image is required.' });
	}
	if (!mongoose.isValidObjectId(animalId)) {
		return res.status(400).send({ error: 'Animal id is not correct.' });
	}
	const animal = await Animal.findById(animalId);
	if (!animal) {
		return res.status(400).send({ error: 'Animal is not Exist.' });
	}
	const isOwnAnimal = await Animal.findOne({
		client: new mongoose.Types.ObjectId(clientId),
	});
	if (!isOwnAnimal) {
		return res
			.status(400)
			.send({ error: 'Animal is not Exist for that user.' });
	}
	const profilePicture = await uploadBase64S3(image, `${animalId}-profile-pic`);
	if (!profilePicture) {
		return res.status(400).send({ error: 'Image cannot uploaded.' });
	}
	animal.profilePicture = profilePicture || animal.profilePicture;
	await animal.save();
	return res.send({ animal, message: 'foto bijgewerkt.' });
};

const updateAnimalData = async (req, res) => {
	const { clientId } = req;
	const { animalId } = req.params;
	const { name, race, chipNumber, sex, dob, color } = req.body;
	if (!mongoose.isValidObjectId(animalId)) {
		return res.status(400).send({ error: 'Animal id is not correct.' });
	}
	const animal = await Animal.findById(animalId);
	if (!animal) {
		return res.status(400).send({ error: 'Animal is not Exist.' });
	}
	const isOwnAnimal = await Animal.findOne({
		client: new mongoose.Types.ObjectId(clientId),
	});
	if (!isOwnAnimal) {
		return res
			.status(400)
			.send({ error: 'Animal is not Exist for that user.' });
	}
	animal.name = name || animal.name;
	animal.race = race || animal.race;
	animal.chipNumber = chipNumber || animal.chipNumber;
	animal.sex = sex || animal.sex;
	animal.dob = dob || animal.dob;
	animal.color = color || animal.color;
	await animal.save();
	return res.send({ animal, message: 'succesvol geüpdatet.' });
};

const updateAnimalAdditionalData = async (req, res) => {
	const { clientId } = req;
	const { animalId } = req.params;
	const {
		neuteredOrSterilised,
		hasTheAnimalChemicallyCastrated,
		dateOfCastrationOrSterilization,
		additionalInformationAboutCastrationOrSterilization,
		lastLoops,
		loopsDuringStay,
		additionalInformationAboutNutritionDiet,
	} = req.body;
	if (!mongoose.isValidObjectId(animalId)) {
		return res.status(400).send({ error: 'Animal id is not correct.' });
	}
	const animal = await Animal.findById(animalId);
	if (!animal) {
		return res.status(400).send({ error: 'Animal is not Exist.' });
	}
	const isOwnAnimal = await Animal.findOne({
		client: new mongoose.Types.ObjectId(clientId),
	});
	if (!isOwnAnimal) {
		return res
			.status(400)
			.send({ error: 'Animal is not Exist for that user.' });
	}
	animal.neuteredOrSterilised =
		neuteredOrSterilised || animal.neuteredOrSterilised;
	animal.hasTheAnimalChemicallyCastrated =
		hasTheAnimalChemicallyCastrated || animal.hasTheAnimalChemicallyCastrated;
	animal.dateOfCastrationOrSterilization =
		dateOfCastrationOrSterilization || animal.dateOfCastrationOrSterilization;
	animal.additionalInformationAboutCastrationOrSterilization =
		additionalInformationAboutCastrationOrSterilization ||
		animal.additionalInformationAboutCastrationOrSterilization;
	animal.lastLoops = lastLoops || animal.lastLoops;
	animal.loopsDuringStay = loopsDuringStay || animal.loopsDuringStay;
	animal.additionalInformationAboutNutritionDiet =
		additionalInformationAboutNutritionDiet ||
		animal.additionalInformationAboutNutritionDiet;
	await animal.save();
	return res.send({ animal, message: 'succesvol geüpdatet.' });
};

const updateAnimalMedicationAndBehaviorData = async (req, res) => {
	const { clientId } = req;
	const { animalId } = req.params;
	const {
		informationAboutMedicationUse,
		behaviorAtHome,
		behaviorTowardsOtherAnimals,
	} = req.body;

	if (!mongoose.isValidObjectId(animalId)) {
		return res.status(400).send({ error: 'Animal id is not correct.' });
	}
	const animal = await Animal.findById(animalId);
	if (!animal) {
		return res.status(400).send({ error: 'Animal is not Exist.' });
	}
	const isOwnAnimal = await Animal.findOne({
		client: new mongoose.Types.ObjectId(clientId),
	});
	if (!isOwnAnimal) {
		return res
			.status(400)
			.send({ error: 'Animal is not Exist for that user.' });
	}
	animal.informationAboutMedicationUse =
		informationAboutMedicationUse || animal.informationAboutMedicationUse;
	animal.behaviorAtHome = behaviorAtHome || animal.behaviorAtHome;
	animal.behaviorTowardsOtherAnimals =
		behaviorTowardsOtherAnimals || animal.behaviorTowardsOtherAnimals;
	await animal.save();
	return res.send({ animal, message: 'succesvol geüpdatet.' });
};

const addVaccination = async (req, res) => {
	let documentLocation;
	const { clientId } = req;
	const { animalId } = req.params;
	const { expireDate, vaccinationType, document, documentName } = req.body;
	if (!mongoose.isValidObjectId(animalId)) {
		return res.status(400).send({ error: 'Animal id is not correct.' });
	}
	const animal = await Animal.findById(animalId);
	if (!animal) {
		return res.status(400).send({ error: 'Animal is not Exist.' });
	}
	const isOwnAnimal = await Animal.findOne({
		client: new mongoose.Types.ObjectId(clientId),
	});
	if (!isOwnAnimal) {
		return res
			.status(400)
			.send({ error: 'Animal is not Exist for that user.' });
	}
	if (document) {
		documentLocation = await uploadBase64S3(document);
		if (!documentLocation) {
			documentLocation = '';
		}
	}
	animal.vaccination.push({
		vaccinationType,
		expireDate,
		documentName,
		documentUrl: documentLocation,
	});
	await animal.save();
	return res.send({ animal, message: 'succesvol aangemaakt.' });
};

const deleteVaccination = async (req, res) => {
	const { clientId } = req;
	const { animalId, vaccinationId } = req.params;
	if (!mongoose.isValidObjectId(animalId)) {
		return res.status(400).send({ error: 'Animal id is not correct.' });
	}
	const animal = await Animal.findById(animalId);
	if (!animal) {
		return res.status(400).send({ error: 'Animal is not Exist.' });
	}
	const isOwnAnimal = await Animal.findOne({
		client: new mongoose.Types.ObjectId(clientId),
	});
	if (!isOwnAnimal) {
		return res
			.status(400)
			.send({ error: 'Animal is not Exist for that user.' });
	}
	const isVaccination = await Animal.findOneAndUpdate(
		{
			'vaccination._id': mongoose.Types.ObjectId(vaccinationId),
		},
		{
			$pull: { vaccination: { _id: mongoose.Types.ObjectId(vaccinationId) } },
		},
		{
			new: true,
		}
	);
	if (!isVaccination) {
		return res.status(400).send({ error: 'Vaccination id is not exist.' });
	}
	return res.send({ isVaccination, message: 'vaccinatie geschrapt.' });
};

const addWeight = async (req, res) => {
	const { clientId } = req;
	const { animalId } = req.params;
	const { weight, date } = req.body;
	if (!mongoose.isValidObjectId(animalId)) {
		return res.status(400).send({ error: 'Animal id is not correct.' });
	}
	const animal = await Animal.findById(animalId);
	if (!animal) {
		return res.status(400).send({ error: 'Animal is not Exist.' });
	}
	const isOwnAnimal = await Animal.findOne({
		client: new mongoose.Types.ObjectId(clientId),
	});
	if (!isOwnAnimal) {
		return res
			.status(400)
			.send({ error: 'Animal is not Exist for that user.' });
	}
	animal.weightInfo.push({
		date,
		weight,
	});
	await animal.save();
	return res.send({ animal, message: 'succesvol aangemaakt.' });
};

const deleteWeight = async (req, res) => {
	const { clientId } = req;
	const { animalId, weightId } = req.params;
	if (!mongoose.isValidObjectId(animalId)) {
		return res.status(400).send({ error: 'Animal id is not correct.' });
	}
	const animal = await Animal.findById(animalId);
	if (!animal) {
		return res.status(400).send({ error: 'Animal is not Exist.' });
	}
	const isOwnAnimal = await Animal.findOne({
		client: new mongoose.Types.ObjectId(clientId),
	});
	if (!isOwnAnimal) {
		return res
			.status(400)
			.send({ error: 'Animal is not Exist for that user.' });
	}
	const isWeight = await Animal.findOneAndUpdate(
		{
			'weightInfo._id': mongoose.Types.ObjectId(weightId),
		},
		{
			$pull: { weightInfo: { _id: mongoose.Types.ObjectId(weightId) } },
		},
		{
			new: true,
		}
	);
	if (!isWeight) {
		return res.status(400).send({ error: 'weight id is not exist.' });
	}
	return res.send({ isWeight, message: 'Gewicht geschrapt.' });
};

const getAllAnimals = async (req, res) => {
	const pageOptions = {
		page: parseInt(req.query.page, 10) || 0,
		limit: parseInt(req.query.limit, 10) || 10,
	};
	const { clientId } = req;
	const animals = await Animal.find({
		client: mongoose.Types.ObjectId(clientId),
	})
		.select('_id name race dob')
		.skip(pageOptions.page * pageOptions.limit)
		.limit(pageOptions.limit);
	const totalAnimals = await Animal.find({
		client: mongoose.Types.ObjectId(clientId),
	}).count();
	return res.send({ animals, totalAnimals });
};

const getAnimalById = async (req, res) => {
	const { clientId } = req;
	const { animalId } = req.params;
	const animal = await Animal.findOne({
		client: mongoose.Types.ObjectId(clientId),
		_id: mongoose.Types.ObjectId(animalId),
	});
	return res.send({ animal });
};

module.exports = {
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
};
