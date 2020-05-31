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

exports.forgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		const result = await userService.forgotPasswordRequest(email);

		if (!result.success) {
			res.apiResponse = {
				status: Status.NOT_FOUND,
				success: result.success,
				message: 'User not found.'
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

exports.renewPassword = async (req, res, next) => {
	try {
		const { password, code } = req.body;

		const result = await userService.renewPassword(code, password);

		if (!result.success) {
			res.apiResponse = {
				status: Status.NOT_FOUND,
				success: result.success,
				message: 'User not found.'
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

exports.register = async (req, res, next) => {
	try {
		const { userName, email, password } = req.body;
		const result = await userService.registerUser({ userName, email, password });

		if (!result.success) {
			res.apiResponse = {
				status: Status.NOT_FOUND,
				success: result.success,
				error: result.error
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

exports.verifyRegister = async (req, res, next) => {
	try {
		const { code } = req.body;

		const result = await userService.verifyRegister(code);

		if (!result.success) {
			res.apiResponse = {
				status: Status.NOT_FOUND,
				success: result.success,
				message: 'User not found.'
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
