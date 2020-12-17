const { authController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
const { apiResponse, validate } = require('../middlewares/middlewares.index');
const { authValidation } = require('../validations/validations.index');

exports.assignRoutes = app => {
	/**
	 * Login
	 */
	app.post(
		requestUtil.getUrlPrefix('auth/login'),
		validate(authValidation.login),
		authController.login,
		apiResponse.send
	);

	/**
	 * Forgot Password
	 */
	app.post(
		requestUtil.getUrlPrefix('auth/forgotpassword'),
		validate(authValidation.forgotPassword),
		authController.forgotPassword,
		apiResponse.send
	);

	/**
	 * Renew Password
	 */
	app.post(
		requestUtil.getUrlPrefix('auth/renewPassword'),
		validate(authValidation.resetPassword),
		authController.renewPassword,
		apiResponse.send
	);

	/**
	 * Register User
	 */
	app.post(
		requestUtil.getUrlPrefix('auth/register'),
		validate(authValidation.register),
		authController.register,
		apiResponse.send
	);

	/**
	 * Verify Register
	 */
	app.post(
		requestUtil.getUrlPrefix('auth/verifyregister'),
		validate(authValidation.verifyRegister),
		authController.verifyRegister,
		apiResponse.send
	);
};
