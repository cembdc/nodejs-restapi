const mongoose = require('mongoose');
const { config } = require('../config/config');

// let db;

// const startMongo = async () => {
// 	if (db) return db;

// 	const conStr = config.db_config.connStr;

// 	try {
// 		await mongoose.connect(conStr, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true });
// 		db = mongoose.connection;
// 		console.log(`%cMongo connection created: ${conStr}`, 'color: green');
// 	} catch (error) {
// 		console.log(`%cError creating db connection: ${error}`, 'color: red');
// 	}
// };

// exports.startMongo = startMongo;

mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', err => {
	console.log(`%cError creating db connection: ${err}`, 'color: red');
	process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
	mongoose
		.connect(config.db_config.connStr, {
			useCreateIndex: true,
			keepAlive: 1,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		.then(() => console.log(`%cMongo connection created: ${config.db_config.connStr}`, 'color: green'));
	return mongoose.connection;
};
