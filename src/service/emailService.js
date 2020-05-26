const { emailUtil } = require('../utils/utils.index');
const { config } = require('../config/config');

/**
 * @description Send fortgot password mail to user
 * @param mailOptions object contains "toAddress", "userName", "code"
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean}>}
 * {success: false, error: any} or {success: true}
 */
exports.sendForgotPasswordMail = async mailOptions => {
	try {
		const url = `${config.client_config.host}${config.client_config.forgotPasswordHtml}?code=${mailOptions.code}`;

		const mailDto = {
			to: mailOptions.toAddress,
			subject: 'Forgot Password',
			html: `<html><p>Dear ${mailOptions.userName},</p><p><a href='${url}'>Click to renew your password</a></p></br><p>If you can't click the link, copy it and paste it into your browser's address bar.</p><p>${url}</p></html>`
		};

		await emailUtil.sendMail(mailDto);

		return { success: true };
	} catch (error) {
		throw { success: false, error: any };
	}
};
