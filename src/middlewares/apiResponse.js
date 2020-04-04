exports.send = (req, res) => {
	const { status, success, error, data, message } = res.apiResponse;

	return res.status(status).json({
		success,
		error: error || '',
		message: message || '',
		data: data || ''
	});
};
