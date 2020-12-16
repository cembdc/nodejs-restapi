const dotenv = require('dotenv');

dotenv.config();

exports.config = {
	db_config: {
		connStr: process.env.DB_CONNECTION_STRING
	},
	api_config: {
		api_host: process.env.API_HOST,
		api_port: process.env.API_PORT,
		api_base_url: process.env.API_BASE_URL
	},
	token_config: {
		secret: 'nodejsRestApi2020',
		expiresIn: '2h'
	},
	mail_config: {
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		username: process.env.MAIL_USER_NAME,
		password: process.env.MAIL_PASSWORD,
		from: process.env.MAIL_FROM
	},
	client_config: {
		host: process.env.CLIENT_HOST,
		forgotPasswordHtml: 'forgotpassword.html',
		accountVerification: 'accountverification.html'
	}
};
