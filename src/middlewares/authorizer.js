const { userService } = require('../service/service.index');
const cryptUtil = require('../utils/cryptUtil');

exports.checkAuth = async (req, res, next) => {
	try {
		/* JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = cryptUtil.decodeToken(token);

		if (!decodedToken.isLoggedIn) {
			const publicPages = [
				'/auth/login',
				'/auth/forgotpassword',
				'/auth/renewPassword',
				'/auth/register',
				'/auth/verifyRegister'
			];

			const authRequired = !publicPages.includes(req.path);

			if (authRequired) {
				console.log('Authorization failed 1');

				return res.status(401).send({
					success: false,
					message: 'Authorization failed'
				});
			}
		}

		const result = await userService.getUser(decodedToken.userId);

		if (!result.success) {
			console.log('Authorization failed 2');
			return res.status(401).send({
				success: false,
				message: 'Authorization failed'
			});
		}

		req.userData = result.data;
		next();
	} catch (error) {
		console.log('Authorization failed 3');
		return res.status(401).send({
			success: false,
			message: 'Authorization failed'
		});
	}
};
