const jwt = require('jsonwebtoken');
const { userService } = require('../service/service.index');
const { config } = require('../config/config');

exports.checkAuth = async (req, res, next) => {
	try {
		/* JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, config.token_config.secret);

		const result = await userService.getUser(decodedToken.userId);

		if (!result.success) {
			return res.status(401).send({
				success: false,
				message: 'Authorization failed'
			});
		}

		req.userData = result.data;
		next();
	} catch (error) {
		return res.status(401).send({
			success: false,
			message: 'Authorization failed'
		});
	}
};
