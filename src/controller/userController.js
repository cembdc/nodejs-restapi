const Status = require('http-status');
const { userService } = require('../service/service.index');

exports.getAllUsers = async (req, res, next) => {
	try {
		const result = await userService.getAllUsers();

		res.apiResponse = {
			status: Status.OK,
			success: result.success,
			error: result.error,
			data: result.data,
			message: 'Succesfull'
		};
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

exports.getUser = async (req, res, next) => {
	try {
		const result = await userService.getUser(req.params.id);

		res.apiResponse = {
			status: Status.OK,
			success: result.success,
			error: result.error,
			data: result.data,
			message: 'Succesfull'
		};
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

exports.createUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const result = await userService.createUser({ name, email, password });

		if (!result.success) {
			res.apiResponse = {
				status: Status.NOT_ACCEPTABLE,
				success: result.success,
				message: result.error
			};
		} else {
			res.apiResponse = {
				status: Status.OK,
				success: result.success,
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

exports.updateUser = async (req, res, next) => {
	try {
		const { name, email } = req.body;
		const result = await userService.updateUser({ name, email });

		res.apiResponse = {
			status: Status.OK,
			success: result.success,
			error: result.error,
			data: result.data,
			message: 'Succesfull'
		};
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
