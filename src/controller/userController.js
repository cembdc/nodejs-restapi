exports.usertest = async (req, res) => {
	const data = {
		fullName: 'Cem',
		email: 'Bdc',
		lang: 'tr',
		gmt: '+3'
	};

	res.status(200).send(data);
};
