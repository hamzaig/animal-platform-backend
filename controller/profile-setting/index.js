const bcrypt = require('bcryptjs');
const Client = require('../../models/Client');
const { uploadBase64S3 } = require('../../utils/aws');

const updatePersonalInformation = async (req, res) => {
	const { clientId } = req;
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
	//  here handling organization: futureWork
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
	if (profilePicture) {
		const profilePictureLocation = await uploadBase64S3(
			profilePicture,
			`${clientId}-profile-picture`
		);
		client.profilePicture = profilePictureLocation;
	}
	client.organizationId = organizationId;
	client.salutation = salutation;
	client.initials = initials;
	client.firstName = firstName;
	client.lastName = lastName;
	client.email = email;
	client.addressInformation = {
		streetAndHouseNo,
		postalCode,
		place,
		country,
	};
	client.phoneNumber1 = phoneNumber1;
	client.phoneNumber2 = phoneNumber2 || client.phoneNumber2;
	await client.save();
	return res.send({ message: 'Persoonlijke gegevens worden bijgewerkt.' });
};

const updateVeterinarianInformation = async (req, res) => {
	const { clientId } = req;
	const client = await Client.findById(clientId);
	if (!client) {
		return res.status(400).send({ error: 'Client Id is not Found' });
	}
	const {
		practice,
		veterinarianName,
		streetAndHouseNo,
		postalCode,
		place,
		country,
		emailAddress,
		phoneNumber,
	} = req.body;
	const updatedClient = await Client.findByIdAndUpdate(
		clientId,
		{
			$set: {
				veterinarianData: {
					practice,
					veterinarianName,
					streetAndHouseNo,
					postalCode,
					place,
					country,
					emailAddress,
					phoneNumber,
				},
			},
		},
		{ upsert: true, new: true }
	);
	return res.send({ updatedClient, message: 'succesvol geüpdatet.' });
};

const updateEmergenciesInformation = async (req, res) => {
	const { clientId } = req;
	const client = await Client.findById(clientId);
	if (!client) {
		return res.status(400).send({ error: 'Client Id is not Found' });
	}
	const { contactUsAt, fullName, emailAddress, phoneNumber, comments } =
		req.body;
	const updatedClient = await Client.findByIdAndUpdate(
		clientId,
		{
			$set: {
				emergenciesInfo: {
					contactUsAt,
					fullName,
					emailAddress,
					phoneNumber,
					comments,
				},
			},
		},
		{ upsert: true, new: true }
	);
	return res.send({ updatedClient, message: 'succesvol geüpdatet.' });
};

const updateFinancialInformation = async (req, res) => {
	const { clientId } = req;
	const client = await Client.findById(clientId);
	if (!client) {
		return res.status(400).send({ error: 'Client Id is not Found' });
	}
	const { iban, accountHolderName } = req.body;
	const updatedClient = await Client.findByIdAndUpdate(
		clientId,
		{
			$set: {
				financialsInfo: {
					iban,
					accountHolderName,
				},
			},
		},
		{ upsert: true, new: true }
	);
	return res.send({ updatedClient, message: 'succesvol geüpdatet.' });
};

const getClientInformation = async (req, res) => {
	const { clientId } = req;
	const client = await Client.findById(clientId).select(
		'-password -tokens -resetPasswordToken -resetPasswordExpires'
	);
	if (!client) {
		return res.status(400).send({ error: 'Client Id is not Found' });
	}
	//  handle organization Name with organization id.: futureWork
	return res.send({ client });
};

module.exports = {
	updatePersonalInformation,
	updateVeterinarianInformation,
	updateEmergenciesInformation,
	updateFinancialInformation,
	getClientInformation,
};
