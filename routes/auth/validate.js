const yup = require('yup');

const signupValidation = yup.object({
	firstName: yup.string().max(12).required(),
	lastName: yup.string().max(12).required(),
	email: yup.string().email().max(32).required(),
	password: yup.string().min(8).required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match.')
		.required(),
	organizationName: yup.string().max(32).required(),
});

const loginValidation = yup.object({
	email: yup.string().email().max(32).required(),
	password: yup.string().min(8).required(),
});

const recoverValidation = yup.object({
	email: yup.string().email().max(32).required(),
});

module.exports = {
	signupValidation,
	loginValidation,
	recoverValidation,
};
