const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const saltRounds = 10;

const encode = data => {
	const cipher = crypto.createCipher('aes-256-cbc', config.token_config.secret);

	let crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
};

const generateSalt = () => crypto.randomBytes(10).toString('hex') + encode(config.token_config.secret);

const hash = (password, salt) => crypto.pbkdf2Sync(password, salt, saltRounds, 32, `sha512`).toString(`hex`);

const verifyHash = data => data.hashPassword === this.hash(data.password, data.salt);

const createToken = payload => {
	const token = jwt.sign(payload, config.token_config.secret, {
		expiresIn: config.token_config.expiresIn
	});

	return token;
};

const decodeToken = token => {
	const decodedToken = jwt.verify(token, config.token_config.secret);

	return decodedToken;
};

exports.hash = hash;
exports.verifyHash = verifyHash;
exports.generateSalt = generateSalt;
exports.createToken = createToken;
exports.encode = encode;
exports.decodeToken = decodeToken;
