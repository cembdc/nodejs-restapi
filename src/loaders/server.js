const app = require('./express');
const mongoose = require('./mongoose');
const { config } = require('../config/config');

// express.startServer();
// mongoose.startMongo();

mongoose.startMongo().then(() => {
	console.log('Connected to MongoDB');
	// server = app.listen(config.port, () => {
	//   logger.info(`Listening to port ${config.port}`);
	// });
	app.listen(config.api_config.api_port);

	console.log(
		`%cAPI Running on: ${config.api_config.api_host}:${config.api_config.api_port}${config.api_config.api_base_url}`,
		'color: green'
	);
});
