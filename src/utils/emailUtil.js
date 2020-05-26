const nodemailer = require('nodemailer');
const { config } = require('../config/config');

const transport = nodemailer.createTransport({
	host: config.mail_config.host,
	port: config.mail_config.port,
	auth: {
		user: config.mail_config.username,
		pass: config.mail_config.password
	}
});

/**
 * @description Sends mail
 * @param mailOptions {object} Object containing 'to', 'subject', 'text', 'html'
 * To send HTML formatted text in your email, use the "html" property instead of the "text" property
 *
 */
exports.sendMail = async mailOptions => {
	try {
		await transport.sendMail(mailOptions);
		console.log('Email sent');
	} catch (error) {
		console.log(error);
	}
};
