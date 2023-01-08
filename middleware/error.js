const winston = require('winston');

// eslint-disable-next-line no-unused-vars
module.exports.winston = (err, req, res, next) => {
	winston.error(err.message, err);
	res.status(500).send({ error: 'Er is iets fout gegaan!' });
};

// eslint-disable-next-line no-unused-vars
module.exports.error = (err, req, res, next) => {
	res.status(500).send({
		msg: 'Er is iets fout gegaan',
		...(err.message && { error: err.message }),
	});
};

// eslint-disable-next-line no-unused-vars, consistent-return
module.exports.dbError = (error, req, res, next) => {
	try {
		// eslint-disable-next-line default-case
		switch (Number(error?.code)) {
			case 11000:
				return res.status(500).send({
					key: Object.keys(error.keyPattern)[0],
					error: `${Object.keys(error.keyPattern)[0]} bestaat al`,
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
							error: `Ongeldige waarde voor ${err.path}`,
						});
					}
					if (err.name === 'CastError') {
						errors.push({
							key: err.path,
							error: `Ongeldige waarde voor ${err.path}`,
						});
					}
				});
				return res.status(500).send(errors);
		}
		throw new Error(error);
	} catch (e) {
		console.error('dbError', error);
		res.status(500).send({
			msg: 'Er is iets fout gegaan',
			...(error.message && { error: error.message }),
		});
	}
};
