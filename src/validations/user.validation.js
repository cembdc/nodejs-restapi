const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const getUser = {
	params: Joi.object().keys({
		id: Joi.string()
			.required()
			.custom(objectId)
	})
};

const updateUser = {
	params: Joi.object().keys({
		id: Joi.string()
			.required()
			.custom(objectId)
	}),
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

const createUser = {
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

module.exports = {
	getUser,
	updateUser,
	createUser
};
