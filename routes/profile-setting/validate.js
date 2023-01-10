const Yup = require('yup');
const {
	mongoIdRegex,
	base64ImageRegex,
} = require('../../utils/validation-helper');

const updatePersonalInformationSchema = Yup.object().shape({
	profilePicture: Yup.string()
		.matches(base64ImageRegex, 'Profile Picture Must be in Base64 Format')
		.trim(),
	organizationId: Yup.string()
		.trim()
		.matches(
			mongoIdRegex,
			'"Organisatie Id" moet een MongoDB ObjectId-formaat string zijn'
		)
		.required('Organisatie Id is verplicht'),
	salutation: Yup.string()
		.trim()
		.required('"Begroeting" is verplicht')
		.oneOf(['Dhr.', 'Mevr.']),
	initials: Yup.string().trim().required('"Initials" is verplicht'),
	firstName: Yup.string().trim().required('"Voornaam" is verplicht'),
	lastName: Yup.string().trim().required('"Last Name" is verplicht'),
	streetAndHouseNo: Yup.string()
		.trim()
		.required('"Straat en huisnummer" is verplicht'),
	postalCode: Yup.string().trim().required('"Postcode" is verplicht'),
	place: Yup.string().trim().required('"Place" is verplicht'),
	country: Yup.string().trim().required('"Country" is verplicht'),
	email: Yup.string()
		.trim()
		.email()
		.required('"E-mail" moet een geldig e-mailadres zijn'),
	phoneNumber1: Yup.string().trim().required('"Telefoonnummer 1" is verplicht'),
	phoneNumber2: Yup.string().trim().optional(),
	oldPassword: Yup.string().test(
		'password-change',
		'Please enter your current password',
		function (value) {
			if (this.parent.newPassword) {
				return value !== undefined;
			}
			return true;
		}
	),
	newPassword: Yup.string().test(
		'password-change',
		'Please enter a new password',
		function (value) {
			if (this.parent.oldPassword) {
				return value !== undefined;
			}
			return true;
		}
	),
	confirmNewPassword: Yup.string().test(
		'password-match',
		'Passwords do not match',
		function (value) {
			if (this.parent.newPassword) {
				return value === this.parent.newPassword;
			}
			return true;
		}
	),
});

const updateVeterinarianInformationSchema = Yup.object().shape({
	practice: Yup.string().trim().required('"practice" is Required.'),
	veterinarianName: Yup.string()
		.trim()
		.required('"veterinarianName" is Required.'),
	streetAndHouseNo: Yup.string()
		.trim()
		.required('"streetAndHouseNo" is Required.'),
	postalCode: Yup.string().trim().required('"postalCode" is Required.'),
	place: Yup.string().trim().required('"place" is Required.'),
	country: Yup.string().trim().required('"country" is Required.'),
	emailAddress: Yup.string()
		.email('emailAddress Must be an Email')
		.trim()
		.required('"emailAddress" is Required.'),
	phoneNumber: Yup.string().trim().required('"phoneNumber" is Required.'),
});

const updateEmergenciesInformationSchema = Yup.object().shape({
	contactUsAt: Yup.string()
		.trim()
		.required()
		.oneOf(['Bellen', 'SMS', 'E-mail', 'Bellen, SMS of e-mail']),
	fullName: Yup.string().trim().required(),
	emailAddress: Yup.string().trim().required(),
	phoneNumber: Yup.string().trim().required(),
	comments: Yup.string().trim(),
});

const updateFinancialInformationSchema = Yup.object().shape({
	iban: Yup.string().trim().required(),
	accountHolderName: Yup.string().trim().required(),
});

module.exports = {
	updatePersonalInformationSchema,
	updateVeterinarianInformationSchema,
	updateEmergenciesInformationSchema,
	updateFinancialInformationSchema,
};
