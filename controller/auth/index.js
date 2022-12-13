const { default: mongoose } = require('mongoose');
const Client = require('../../models/Client');
const { sendEmailAWS } = require('../../utils/email');

const signUp = async (req, res) => {
	// eslint-disable-next-line no-unused-vars
	const { firstName, lastName, email, password, organizationName } = req.body;

	const organizationId = new mongoose.Types.ObjectId();

	const client = new Client({
		firstName,
		lastName,
		email,
		password,
		organizationId,
	});

	await client.save();

	const token = await client.generateAuthToken();
	res.status(201).send({ client, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const client = await Client.findByCredentials(email, password);
	const token = await client.generateAuthToken();
	return res.send({ client, token });
};

const recover = async (req, res) => {
	const { email } = req.body;
	const client = await Client.findOne({ email });
	if (!client) {
		return res.status(401).send({
			error: `Dit e-mailadres ${email} is aan geen enkel account gekoppeld. Controleer uw e-mailadres nogmaals en probeer het opnieuw.`,
		});
	}
	client.generatePasswordReset();
	await client.save();
	const link = `${process.env.SERVER_URL}/api/auth/reset/${client.resetPasswordToken}`;
	const html = `<body><h1>Hoi ${client.firstName} </h1>
		<p>Klik op de volgende link <a href="${link}">${link}</a> om uw wachtwoord opnieuw in te stellen.
		Als je hier niet om hebt gevraagd, negeer dan deze e-mail en je wachtwoord blijft ongewijzigd.\n</p></body>`;
	await sendEmailAWS(
		client.email,
		html,
		'Aanvraag wachtwoord wijzigen',
		process.env.FROM_EMAIL
	);
	return res.status(200).json({
		message: `Er is een reset-e-mail verzonden naar ${client.email}.`,
	});
};

const reset = async (req, res) => {
	const { token } = req.params;
	const client = await Client.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!client) {
		return res.status(401).send({
			error: 'Token voor wachtwoordherstel is ongeldig of is verlopen.',
		});
	}
	return res.redirect(
		`${process.env.BASE_URL_FRONTEND}/change-password?token=${token}`
	);
};

const resetPassword = async (req, res) => {
	const { password, token } = req.body;
	const client = await Client.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!client) {
		return res.status(401).send({
			error: 'Token voor wachtwoordherstel is ongeldig of is verlopen.',
		});
	}
	client.password = password;
	// client.resetPasswordToken = undefined;
	// client.resetPasswordExpires = undefined;
	await client.save();
	// eslint-disable-next-line no-unused-vars
	const mailOptions = {
		to: client.email,
		from: process.env.FROM_EMAIL,
		subject: 'Uw wachtwoord is veranderd',
		text: `Hoi ${client.firstName} \n Dit is een bevestiging dat het wachtwoord voor uw account ${client.email} zojuist is gewijzigd.\n`,
	};
	return res.status(200).json({ message: 'Uw wachtwoord is geüpdatet.' });
};

const logout = async (req, res) => {
	req.client.tokens = req.client.tokens.filter(
		(token) => token.token !== req.token
	);
	await req.client.save();
	res.send();
};

module.exports = { signUp, login, recover, reset, resetPassword, logout };
