const { body } = require('express-validator');
const { userController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
const { validator } = require('../middlewares/middlewares.index');

exports.assignRoutes = app => {
	app.get(requestUtil.getUrlPrefix('user/usertest'), userController.usertest);

	app.post(
		requestUtil.getUrlPrefix('user/register'),
		[
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
		userController.register
	);
};
