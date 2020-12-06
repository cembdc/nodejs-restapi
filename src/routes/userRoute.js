const { userController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
const { apiResponse, authorizer, validate } = require('../middlewares/middlewares.index');
const { userValidation } = require('../validations/validations.index');

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
		validate(userValidation.getUser),
		authorizer.checkAuth,
		userController.getUser,
		apiResponse.send
	);

	/**
	 * Update User
	 */
	app.put(
		requestUtil.getUrlPrefix('user/:id'),
		validate(userValidation.updateUser),
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
