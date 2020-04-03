exports.send = (req, res) => {
	const { status, success, error, data, message } = req.apiResponse;

	return res.status(status).json({
		success,
		error: error || '',
		message: message || '',
		data: data || ''
	});
};
