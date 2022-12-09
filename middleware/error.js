const winston = require('winston');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	winston.error(err.message, err);
	res.status(500).send({ msg: 'Something went wrong!' });
};

// eslint-disable-next-line no-unused-vars
module.exports.error = (err, req, res, next) => {
	console.error(err);
	res.status(500).send({
		msg: 'Something went wrong',
		...(err.message && { error: err.message }),
	});
};
