const Yup = require('yup');

const addVaccinationSchema = Yup.object().shape({
	vaccinationType: Yup.string().trim().required(),
	expireDate: Yup.string().trim().required(),
});

module.exports = { addVaccinationSchema };
