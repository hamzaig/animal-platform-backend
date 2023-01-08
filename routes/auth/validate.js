const yup = require('yup');

const signupValidation = yup.object({
	firstName: yup
		.string()
		.max(12, 'voornaam mag maximaal 12 tekens lang zijn.')
		.required('Voornaam is een verplicht veld'),
	lastName: yup
		.string()
		.max(12, 'achternaam mag maximaal 12 tekens lang zijn.')
		.required('Achternaam is een verplicht veld'),
	email: yup
		.string()
		.email('E-mailadres moet een geldige e-mail zijn')
		.max(32, 'e-mail mag maximaal 12 tekens lang zijn.')
		.required('E-mailadres is een verplicht veld'),
	password: yup
		.string()
		.min(8, 'wachtwoord moet minimaal 8 tekens lang zijn.')
		.required('Wachtwoord is een verplicht veld'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'wachtwoorden moeten overeenkomen.')
		.required('Wachtwoord is een verplicht veld'),
	organizationName: yup
		.string()
		.max(32, 'organisatie naam mag maximaal 12 tekens lang zijn.')
		.required('organisatie naam is een verplicht veld'),
});

const loginValidation = yup.object({
	email: yup
		.string()
		.email('E-mailadres moet een geldige e-mail zijn')
		.max(32, 'e-mail mag maximaal 12 tekens lang zijn.')
		.required('E-mailadres is een verplicht veld'),
	password: yup
		.string()
		.min(8, 'wachtwoord moet minimaal 8 tekens lang zijn.')
		.required('Wachtwoord is een verplicht veld'),
});

const recoverValidation = yup.object({
	email: yup
		.string()
		.email('E-mailadres moet een geldige e-mail zijn')
		.max(32, 'e-mail mag maximaal 12 tekens lang zijn.')
		.required('E-mailadres is een verplicht veld'),
});

module.exports = {
	signupValidation,
	loginValidation,
	recoverValidation,
};
