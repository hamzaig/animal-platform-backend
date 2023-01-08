const bcrypt = require('bcryptjs');
const Client = require('../../models/Client');
const { uploadBase64S3 } = require('../../utils/aws');

const updatePersonalInformation = async (req, res) => {
	const { clientId } = req.params;
	const {
		profilePicture,
		organizationId,
		salutation,
		initials,
		firstName,
		lastName,
		streetAndHouseNo,
		postalCode,
		place,
		country,
		email,
		phoneNumber1,
		phoneNumber2,
		oldPassword,
		newPassword,
	} = req.body;
	const client = await Client.findById(clientId);
	if (!client) {
		return res.status(400).send({ error: 'Client Id is not Found' });
	}
	//  here handling organization
	const isAlreadyUsedEmail = await Client.find({ email });
	if (isAlreadyUsedEmail.length > 1) {
		return res.status(400).send({ error: 'E-mail is al gebruikt.' });
	}

	if (oldPassword) {
		const isMatch = await bcrypt.compare(oldPassword, client.password);
		if (!isMatch) {
			throw new Error('Oud wachtwoord komt niet overeen.');
		}
		client.password = newPassword;
	}
	const profilePictureLocation = await uploadBase64S3(
		profilePicture,
		`${clientId}-profile-picture`
	);
	client.profilePicture = profilePictureLocation;
	client.organizationId = organizationId;
	client.salutation = salutation;
	client.initials = initials;
	client.firstName = firstName;
	client.lastName = lastName;
	client.addressInformation = {
		streetAndHouseNo,
		postalCode,
		place,
		country,
	};
	client.phoneNumber1 = phoneNumber1;
	client.phoneNumber2 = phoneNumber2 || client.phoneNumber2;
	return res.send({ message: 'Persoonlijke gegevens worden bijgewerkt.' });
};

module.exports = { updatePersonalInformation };
