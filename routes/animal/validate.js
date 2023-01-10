const Yup = require('yup');

const createAnimalSchema = Yup.object().shape({
	name: Yup.string().trim().required(),
	species: Yup.string().trim().required(),
	chipNumber: Yup.string().trim().required(),
	race: Yup.string().trim().required(),
	dob: Yup.string().trim().required(),
	sex: Yup.string().trim().required().oneOf(['reu', 'teef']),
	size: Yup.string().trim().required(),
	color: Yup.string().trim().required(),
	behaviorAtHome: Yup.string().trim(),
	behaviorTowardsOtherAnimals: Yup.string().trim(),
	animalInSeparateAccomedation: Yup.boolean().required(),
	neuteredOrSterilised: Yup.boolean().required(),
	hasTheAnimalChemicallyCastrated: Yup.boolean().required(),
	additionalInformationAboutCastrationOrSterilization: Yup.string().trim(),
	additionalInformationAboutChemicalCastration: Yup.string().trim(),
	informationAboutMedicationUse: Yup.string().trim().required(),
	feedInformation: Yup.string().trim().required(),
});

const updateAnimalDataSchema = Yup.object().shape({
	name: Yup.string().trim().required(),
	race: Yup.string().trim().required(),
	chipNumber: Yup.string().trim().required(),
	sex: Yup.string().trim().required().oneOf(['reu', 'teef']),
	dob: Yup.string().trim().required(),
	color: Yup.string().trim().required(),
});

const updateAnimalAddionalDataSchema = Yup.object().shape({
	neuteredOrSterilised: Yup.boolean().required(),
	hasTheAnimalChemicallyCastrated: Yup.boolean().required(),
	dateOfCastrationOrSterilization: Yup.string().required(),
	additionalInformationAboutCastrationOrSterilization: Yup.string().trim(),
	lastLoops: Yup.string().trim().required(),
	loopsDuringStay: Yup.boolean().required(),
	additionalInformationAboutNutritionDiet: Yup.string().trim(),
});

const updateAnimalMedicationAndBehaviorSchema = Yup.object().shape({
	informationAboutMedicationUse: Yup.string().required(),
	behaviorAtHome: Yup.string().trim().required(),
	behaviorTowardsOtherAnimals: Yup.string().trim().required(),
});

const addVaccinationSchema = Yup.object().shape({
	vaccinationType: Yup.string().trim().required(),
	expireDate: Yup.string().trim().required(),
	document: Yup.string(),
	documentName: Yup.string().when('document', {
		is: (val) => val !== undefined,
		then: Yup.string().required(),
		otherwise: Yup.string(),
	}),
});

const addWeightSchema = Yup.object().shape({
	date: Yup.string().trim().required(),
	weight: Yup.string().trim().required(),
});

module.exports = {
	createAnimalSchema,
	updateAnimalDataSchema,
	updateAnimalAddionalDataSchema,
	updateAnimalMedicationAndBehaviorSchema,
	addVaccinationSchema,
	addWeightSchema,
};
