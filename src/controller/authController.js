const Status = require('http-status');
const { userService } = require('../service/service.index');

exports.login = async (req, res, next) => {
	try {
		const result = await userService.authenticateUser(req.body.email, req.body.password);

		if (!result.success) {
			res.apiResponse = {
				status: Status.NOT_FOUND,
				success: result.success,
				message: 'User not found, please check your credentials.'
			};
		} else {
			res.apiResponse = {
				status: Status.OK,
				success: result.success,
				data: result.data,
				message: 'Succesfull'
			};
		}
	} catch (error) {
		res.apiResponse = {
			status: Status.BAD_REQUEST,
			success: false,
			error: error.message,
			data: null,
			message: 'Error'
		};
	}

	next();
};
