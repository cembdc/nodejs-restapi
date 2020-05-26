const { body, param } = require('express-validator');
const { userController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
const { validator, apiResponse, authorizer } = require('../middlewares/middlewares.index');

exports.assignRoutes = app => {
	/**
	 * Get All Users
	 */
	app.get(
		requestUtil.getUrlPrefix('user'),
		authorizer.checkAuth,
		userController.getAllUsers,
		apiResponse.send
	);

	/**
	 * Get User
	 */
	app.get(
		requestUtil.getUrlPrefix('user/:id'),
		[
			param('id')
				.exists()
				.custom(value => value.match(/^[0-9a-fA-F]{24}$/) != null)
				.withMessage('Id is required')
		],
		validator.validate,
		authorizer.checkAuth,
		userController.getUser,
		apiResponse.send
	);

	/**
	 * Update User
	 */
	app.put(
		requestUtil.getUrlPrefix('user/:id'),
		[
			param('id')
				.exists()
				.custom(value => value.match(/^[0-9a-fA-F]{24}$/) != null)
				.withMessage('Id is required'),
			body('userName')
				.exists()
				.isLength({ min: 5, max: 10 })
				.withMessage('userName is not valid.(min: 5, max: 10)'),
			body('email')
				.exists()
				.isEmail()
				.withMessage('email is not valid an email')
		],
		validator.validate,
		authorizer.checkAuth,
		userController.updateUser
	);

	/**
	 * Delete User
	 */
	// app.delete(
	// 	requestUtil.getUrlPrefix('user/:id'),
	// 	[
	// 		param('id')
	// 			.exists()
	//			.custom((value) => value.match(/^[0-9a-fA-F]{24}$/) != null)
	// 			.withMessage('Id is required')
	// 	],
	// 	validator.validate,
	// 	userController.deleteUser
	// );
};
