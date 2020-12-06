const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');

const validate = schema => (req, res, next) => {
	const validSchema = pick(schema, ['params', 'query', 'body']);
	const object = pick(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'key' } })
		.validate(object);

	if (error) {
		// const errorMessage = error.details.map(details => details.message).join(', ');
		// return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));

		const extractedErrors = [];
		error.details.map(err => extractedErrors.push({ message: err.message }));

		return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
			errors: extractedErrors
		});
	}
	Object.assign(req, value);
	return next();
};

module.exports = validate;
