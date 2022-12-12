const winston = require('winston');

// eslint-disable-next-line no-unused-vars
module.exports.winston = (err, req, res, next) => {
	console.log('helloWinston');
	winston.error(err.message, err);
	res.status(500).send({ msg: 'Something went wrong!' });
};

// eslint-disable-next-line no-unused-vars
module.exports.error = (err, req, res, next) => {
	console.error('helloError');
	res.status(500).send({
		msg: 'Something went wrong',
		...(err.message && { error: err.message }),
	});
};

// eslint-disable-next-line no-unused-vars, consistent-return
module.exports.dbError = (error, req, res, next) => {
	// console.log('dbError', error);
	console.log('before Try dbError', error);
	try {
		// eslint-disable-next-line default-case
		switch (Number(error?.code)) {
			case 11000:
				return res.status(500).send({
					key: Object.keys(error.keyPattern)[0],
					message: `${Object.keys(error.keyPattern)[0]} already Exists`,
				});
		}
		// eslint-disable-next-line default-case
		switch (error.name) {
			case 'ValidationError':
				// eslint-disable-next-line no-case-declarations, prefer-const
				let errors = [];
				// eslint-disable-next-line array-callback-return
				Object.values(error.errors).map((err) => {
					if (err.name === 'ValidatorError') {
						errors.push({
							key: err.path,
							message: `Invalid value for ${err.path}`,
						});
					}
					if (err.name === 'CastError') {
						errors.push({
							key: err.path,
							message: `Invalid value for ${err.path}`,
						});
					}
				});
				return res.status(500).send(errors);
		}
		throw new Error(error);
	} catch (e) {
		console.error('dbError', error);
		res.status(500).send({
			msg: 'Something went wrong',
			...(error.message && { error: error.message }),
		});
	}
};
