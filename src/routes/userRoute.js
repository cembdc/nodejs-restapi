const { body, param } = require('express-validator');
const { userController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
const { validator, apiResponse } = require('../middlewares/middlewares.index');

exports.assignRoutes = app => {
	/**
	 * Get All Users
	 */
	app.get(requestUtil.getUrlPrefix('user'), userController.getAllUsers, apiResponse.send);

	/**
	 * Get User
	 */
	app.get(
		requestUtil.getUrlPrefix('user/:id'),
		[
			param('id')
				.exists()
				.withMessage('Id is required')
		],
		validator.validate,
		userController.getUser
	);

	/**
	 * Update User
	 */
	app.put(
		requestUtil.getUrlPrefix('user/:id'),
		[
			param('id')
				.exists()
				.withMessage('Id is required'),
			body('username')
				.exists()
				.isLength({ min: 5, max: 10 })
				.withMessage('username is not valid.(min: 5, max: 10)'),
			body('email')
				.exists()
				.isEmail()
				.withMessage('email is not valid an email')
		],
		validator.validate,
		userController.updateUser
	);

	/**
	 * Delete User
	 */
	app.delete(
		requestUtil.getUrlPrefix('user/:id'),
		[
			param('id')
				.exists()
				.withMessage('Id is required')
		],
		validator.validate,
		userController.deleteUser
	);

	/**
	 * Create User
	 */
	app.post(
		requestUtil.getUrlPrefix('user'),
		[
			body('username')
				.exists()
				.isLength({ min: 5, max: 10 })
				.withMessage('username is not valid.(min: 5, max: 10)'),
			body('email')
				.exists()
				.isEmail()
				.withMessage('email is not valid an email'),
			body('password')
				.isLength({ min: 5 })
				.exists()
				.withMessage('password must be at least 5 chars long'),
			body('confirmPassword')
				.exists()
				.custom((value, { req }) => value === req.body.password)
				.withMessage('passwords are not the same')
		],
		validator.validate,
		userController.createUser,
		apiResponse.send
	);
};
