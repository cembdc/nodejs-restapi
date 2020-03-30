const Status = require('http-status');
const { userService } = require('../service/service.index');

exports.getAllUsers = async (req, res) => {
	const users = await userService.getAllUsers();

	res.status(200).send(data);
};

exports.register = async (req, res) => {
	const data = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword
	};

	res.status(Status.OK).send(data);
};
