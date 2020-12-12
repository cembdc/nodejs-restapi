const supertest = require('supertest');
const { expect, assert, should } = require('chai');
const app = require('../src/loaders/express');
const { config } = require('../src/config/config');
const setupTestDBAndConnection = require('./utils/setupTestDBAndConnection');

setupTestDBAndConnection();
// const app = setupTestDBAndConnection.server;

const server = app.listen(config.api_config.api_port, () =>
	console.log(
		`%cAPI Running on: ${config.api_config.api_host}:${config.api_config.api_port}${config.api_config.api_base_url}`,
		'color: green'
	)
);

describe('Example Test', () => {
	it('should return 2', () => {
		expect(1 + 1).to.equal(2);
	});
	it('GET /hello should return Hello World', done => {
		supertest(app)
			.get('/hello')
			.expect(200)
			// .then(res => {
			// 	expect(res.text).to.be.equal('Hello World');
			// });
			.end((err, res) => {
				expect(res.text).to.be.equal('Hello World');

				// server.close();
				done();
			});
	});
});
