const Validator = (schema, params) => async (req, res, next) => {
	try {
		await schema.validate(
			// eslint-disable-next-line no-nested-ternary
			params === 'body'
				? req.body
				: params === 'params'
				? req.params
				: req.query,
			{
				abortEarly: true,
			}
		);
		return next();
	} catch (err) {
		return res.status(500).json({ type: err.name, error: err.errors });
	}
};

module.exports = Validator;
