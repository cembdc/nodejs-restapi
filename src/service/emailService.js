const { emailUtil } = require('../utils/utils.index');

/**
 * @description Send fortgot password mail to user
 * @param toAddress "To" address of mail
 * create user
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean}>}
 * {success: false, error: any} or {success: true}
 */
exports.sendForgotPasswordMail = async toAddress => {
	try {
		const mailDto = {
			to: toAddress,
			subject: 'Forgot Password',
			text: 'Please click to the link in mail to renew your password'
		};
		await emailUtil.sendMail(mailDto);

		return { success: true };
	} catch (error) {
		throw { success: false, error: any };
	}
};
