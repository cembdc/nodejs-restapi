const mongoose = require('mongoose');
const { config } = require('../../src/config/config');

const setupTestDB = () => {
	before(async () => {
		const conStr = config.db_config.connStr;
		await mongoose.connect(conStr, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true });
	});

	beforeEach(async () => {
		await Promise.all(
			Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany())
		);
	});

	after(async () => {
		await mongoose.disconnect();
	});
};

module.exports = setupTestDB;
