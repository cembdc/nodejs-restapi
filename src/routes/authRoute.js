const { body, param } = require('express-validator');
const { authController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
const { validator, apiResponse } = require('../middlewares/middlewares.index');

exports.assignRoutes = app => {
	/**
	 * Login
	 */
	app.post(
		requestUtil.getUrlPrefix('auth/login'),
		[
			body('email')
				.exists()
				.isEmail()
				.withMessage('email is not valid an email'),
			body('password')
				.isLength({ min: 5 })
				.exists()
				.withMessage('password must be at least 5 chars long')
		],
		validator.validate,
		authController.login,
		apiResponse.send
	);
};
