const mongoose = require('mongoose');
const { config } = require('../../src/config/config');

const setupTestDBAndConnection = () => {
	before(async () => {
		await mongoose.connect(config.db_config.connStr, {
			useNewUrlParser: true,
			autoIndex: false,
			useUnifiedTopology: true
		});

		console.log(`%cMongo connection created: ${config.db_config.connStr}`, 'color: green');

		// server = app.listen(config.api_config.api_port, () =>
		// 	console.log(
		// 		`%cAPI Running on: ${config.api_config.api_host}:${config.api_config.api_port}${config.api_config.api_base_url}`,
		// 		'color: green'
		// 	)
		// );

		// return server;

		await Promise.all(
			Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany())
		);
		console.log(`%cMongo collections content cleaned`, 'color: green');
	});

	// beforeEach(async () => {
	// 	await Promise.all(
	// 		Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany())
	// 	);
	// 	console.log(`%cMongo collections content cleaned`, 'color: green');
	// });

	after(async () => {
		await mongoose.disconnect();
		console.log(`%cMongo disconnected`, 'color: green');

		// if (server) {
		// 	server.close();
		// 	console.log(`%cExpress closed`, 'color: green');
		// } else console.log(`%cExpress is already close`, 'color: green');
	});
};

module.exports = setupTestDBAndConnection;
