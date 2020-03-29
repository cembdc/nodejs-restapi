exports.usertest = async (req, res) => {
	const data = {
		fullName: 'Cem',
		email: 'Bdc',
		lang: 'tr',
		gmt: '+3'
	};

	res.status(200).send(data);
};

exports.register = async (req, res) => {
	const data = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword
	};

	res.status(200).send(data);
};
