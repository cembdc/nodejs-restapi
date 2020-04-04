const crypto = require('crypto');
const { config } = require('../config/config');

const encode = data => {
	const cipher = crypto.createCipher('aes-256-cbc', config.token_config.secret);

	let crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
};

exports.encode = encode;
