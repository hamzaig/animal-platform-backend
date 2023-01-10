const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema(
	{
		client: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Client',
		},
		profilePicture: {
			type: String,
		},
		name: {
			type: String,
			required: true,
		},
		species: {
			type: String,
			required: true,
		},
		chipNumber: {
			type: String,
			required: true,
		},
		race: {
			type: String,
			required: true,
		},
		dob: {
			type: String,
			required: true,
		},
		sex: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		behaviorAtHome: {
			type: String,
		},
		behaviorTowardsOtherAnimals: {
			type: String,
		},
		animalInSeparateAccomedation: {
			type: Boolean,
			required: true,
		},
		neuteredOrSterilised: {
			type: Boolean,
			required: true,
		},
		hasTheAnimalChemicallyCastrated: {
			type: Boolean,
			required: true,
		},
		additionalInformationAboutCastrationOrSterilization: {
			type: String,
		},
		additionalInformationAboutChemicalCastration: {
			type: String,
		},
		additionalInformationAboutNutritionDiet: {
			type: String,
		},
		dateOfCastrationOrSterilization: String,
		informationAboutMedicationUse: {
			type: String,
		},
		feedInformation: {
			type: String,
		},
		lastLoops: String,
		loopsDuringStay: Boolean,
		vaccination: [
			{
				type: mongoose.Schema(
					{
						vaccinationType: {
							type: String,
							required: true,
						},
						expireDate: {
							type: String,
							required: true,
						},
						documentName: String,
						documentUrl: String,
					},
					{
						timestamps: true,
					}
				),
			},
		],
		weightInfo: [
			{
				type: mongoose.Schema({
					date: {
						type: String,
						required: true,
					},
					weight: {
						type: String,
						required: true,
					},
				}),
			},
		],
	},
	{
		timestamps: true,
	}
);

const Animal = mongoose.model('Animal', AnimalSchema);

module.exports = { Animal };
