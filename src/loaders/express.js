const express = require('express');
const bodyparser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('../routes/routes');
const { config } = require('../config/config');

exports.startServer = () => {
	const allowCrossDomain = (req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'content-type,  Origin, Accept');
		next();
	};

	try {
		const app = express();

		app.use(allowCrossDomain);
		app.use(bodyparser.urlencoded({ extended: true }));
		app.use(bodyparser.json({ limit: '10mb' }));
		app.use(mongoSanitize());

		routes.assignRoutes(app);
		app.listen(config.api_config.api_port);
	} catch (error) {
		console.log('%cExpressJS: ' + error, 'color: red');
	}

	console.log(
		`%cAPI Running on: ${config.api_config.api_host}:${config.api_config.api_port}${config.api_config.api_base_url}`,
		'color: green'
	);
};
