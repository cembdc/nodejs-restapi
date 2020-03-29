const { userController } = require('../controller/controller.index');
const { requestUtil } = require('../utils/utils.index');
// const { validator } = require('../middlewares/middlewares.index');

exports.assignRoutes = app => {
	// app.post(
	// 	requestUtil.getUrlPrefix('user/register'),
	// 	validator.registerUserValidationRules,
	// 	validator.validate,
	// 	userController.register
	// );

	app.get(requestUtil.getUrlPrefix('user/usertest'), userController.usertest);
};
