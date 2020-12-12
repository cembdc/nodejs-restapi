const mongoose = require('mongoose');
const { config } = require('../../src/config/config');

const setupTestDB = () => {
	before(async () => {
		const conStr = config.db_config.connStr;
		await mongoose.connect(conStr, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true });
		console.log(`%cMongo connection created: ${config.db_config.connStr}`, 'color: green');
	});

	beforeEach(async () => {
		await Promise.all(
			Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany())
		);
		console.log(`%cMongo collections content cleaned`, 'color: green');
	});

	after(async () => {
		await mongoose.disconnect();
		console.log(`%cMongo disconnected`, 'color: green');
	});
};

module.exports = setupTestDB;
