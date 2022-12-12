require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validateEmail } = require('./helper');

const clientSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: 'First Name is required.',
			trim: true,
			lowercase: true,
		},
		lastName: {
			type: String,
			required: 'Last Name is required.',
			trim: true,
			lowercase: true,
		},
		profilePicture: {
			type: String,
		},
		email: {
			type: String,
			required: 'Email is required.',
			trim: true,
			lowercase: true,
			unique: true,
			validate: [validateEmail, 'Please fill a valid email address'],
			match: [
				// eslint-disable-next-line no-useless-escape
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please fill a valid email address',
			],
		},
		password: {
			type: String,
			required: 'Password is required.',
			minlength: 8,
		},
		organizationId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		resetPasswordToken: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

// eslint-disable-next-line func-names
clientSchema.methods.toJSON = function () {
	const client = this;
	const clientObject = client.toObject();

	delete clientObject.password;
	delete clientObject.tokens;

	return clientObject;
};

// eslint-disable-next-line func-names
clientSchema.methods.generateAuthToken = async function () {
	const client = this;
	const token = jwt.sign({ _id: client.id.toString() }, process.env.JWT_SECRET);

	client.tokens = client.tokens.concat({ token });
	await client.save();

	return token;
};

clientSchema.statics.findByCredentials = async (email, password) => {
	// eslint-disable-next-line no-use-before-define
	const client = await Client.findOne({ email });
	if (!client) {
		throw new Error('Unable to login, Client User not Found!');
	}
	const isMatch = await bcrypt.compare(password, client.password);
	if (!isMatch) {
		throw new Error('Unabale to login, Client Password Incorrect!');
	}
	return client;
};

// eslint-disable-next-line func-names
clientSchema.pre('save', async function (next) {
	const client = this;

	if (client.isModified('password')) {
		client.password = await bcrypt.hash(client.password, 8);
	}

	next();
});

// eslint-disable-next-line func-names
clientSchema.methods.generatePasswordReset = function () {
	this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
};

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
