const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('../routes/routes');

const allowCrossDomain = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'content-type, Origin, Accept');
	next();
};

const app = express();

app.use(allowCrossDomain);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '10mb' }));
app.use(mongoSanitize());
app.use(helmet());
app.use(cors());

routes.assignRoutes(app);

app.get('/hello', (req, res, next) => {
	res.send('Hello World');
	next();
});

// const server = app.listen(3000, () => {
// 	console.log('App running on port 3000');
// });

// exports.startServer = () => {
// 	try {
// 		app.listen(config.api_config.api_port);

// 		console.log(
// 			`%cAPI Running on: ${config.api_config.api_host}:${config.api_config.api_port}${config.api_config.api_base_url}`,
// 			'color: green'
// 		);
// 	} catch (error) {
// 		console.log('%cExpressJS: ' + error, 'color: red');
// 	}
// };

module.exports = app;
