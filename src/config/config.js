const dotenv = require('dotenv');

dotenv.config();

exports.config = {
	db_config: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		name: process.env.DB_NAME,
		poolsize: process.env.DB_POOLSIZE,
		auto_reconnect: process.env.DB_AUTO_CONNECT,
		authdb: process.env.DB_AUTHDB
	},
	api_config: {
		api_host: process.env.API_HOST,
		api_port: process.env.API_PORT,
		api_base_url: process.env.API_BASE_URL
	},
	token_config: {
		secret: 'nodejsRestApi'
	}
};
