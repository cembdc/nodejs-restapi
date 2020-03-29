const { config } = require('../config/config');

module.exports = {
	getUrlPrefix: action => {
		return config.api_config.api_base_url + action;
	}
};
