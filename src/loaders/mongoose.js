const mongoose = require('mongoose');
const { config } = require('../config/config');

let db;

const startMongo = async () => {
	if (db) return db;

	const conStr =
		'mongodb://' + config.db_config.host + ':' + config.db_config.port + '/' + config.db_config.name;

	try {
		await mongoose.connect(conStr, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true });
		db = mongoose.connection;
		console.log(`%cMongo connection created: ${conStr}`, 'color: green');
	} catch (error) {
		console.log(`%cError creating db connection: ${error}`, 'color: red');
	}
};

exports.startMongo = startMongo;
