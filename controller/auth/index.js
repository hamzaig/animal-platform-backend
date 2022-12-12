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
			error: `This Email Address ${email} is not associated with any account. Double-check your email address and try again.`,
		});
	}
	client.generatePasswordReset();
	await client.save();
	const link = `${process.env.SERVER_URL}/api/auth/reset/${client.resetPasswordToken}`;
	const html = `<body><h1>Hi ${client.firstName} </h1>
		<p>Please click on the following link <a href="${link}">${link}</a> to reset your password. 
		If you did not request this, please ignore this email and your password will remain unchanged.\n</p></body>`;
	await sendEmailAWS(
		client.email,
		html,
		'Password change request',
		process.env.FROM_EMAIL
	);
	return res.status(200).json({
		message: `A reset email has been sent to ${client.email}.`,
	});
};

const reset = async (req, res) => {
	const { token } = req.params;
	const client = await Client.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!client) {
		return res
			.status(401)
			.send({ error: 'Password reset token is invalid or has expired.' });
	}
	return res.redirect(`${process.env.BASE_URL_FRONTEND}/login`);
};

const resetPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;
	const client = await Client.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() },
	});
	if (!client) {
		return res
			.status(401)
			.send({ error: 'Password reset token is invalid or has expired.' });
	}
	client.password = password;
	client.resetPasswordToken = undefined;
	client.resetPasswordExpires = undefined;
	await client.save();
	// eslint-disable-next-line no-unused-vars
	const mailOptions = {
		to: client.email,
		from: process.env.FROM_EMAIL,
		subject: 'Your password has been changed',
		text: `Hi ${client.firstName} \n 
                    This is a confirmation that the password for your account ${client.email} has just been changed.\n`,
	};
	return res.status(200).json({ message: 'Your password has been updated.' });
};

const logout = async (req, res) => {
	req.client.tokens = req.client.tokens.filter(
		(token) => token.token !== req.token
	);
	await req.client.save();
	res.send();
};

module.exports = { signUp, login, recover, reset, resetPassword, logout };
