const Joi = require('joi');
const { password } = require('./custom.validation');

const login = {
	body: Joi.object()
		.keys({
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string()
				.required()
				.custom(password)
		})
		.options({ abortEarly: false })
};

const forgotPassword = {
	body: Joi.object().keys({
		email: Joi.string()
			.email()
			.required()
	})
};

const resetPassword = {
	query: Joi.object().keys({
		token: Joi.string().required()
	}),
	body: Joi.object().keys({
		password: Joi.string()
			.required()
			.custom(password)
	})
};

const register = {
	body: Joi.object().keys({
		email: Joi.string()
			.required()
			.email(),
		password: Joi.string()
			.required()
			.custom(password),
		name: Joi.string().required()
	})
};

const verifyRegister = {
	body: Joi.object().keys({
		token: Joi.string().required(),
		code: Joi.string().required()
	})
};

module.exports = {
	register,
	login,
	forgotPassword,
	resetPassword,
	verifyRegister
};
