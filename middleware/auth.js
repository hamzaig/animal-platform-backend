const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const client = await Client.findOne({
			// eslint-disable-next-line no-underscore-dangle
			_id: decoded._id,
			'tokens.token': token,
		});
		if (!client) {
			throw new Error('Invalid Token!');
		}
		req.client = client;
		req.token = token;
		next();
	} catch (e) {
		res.status(401).send({ error: 'Please Aunthicate!' });
	}
};

module.exports = auth;
