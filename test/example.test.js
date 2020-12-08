const supertest = require('supertest');
const { expect, assert, should } = require('chai');
const app = require('../src/loaders/express');

describe('Simple Math Test', () => {
	it('should return 2', () => {
		expect(1 + 1).to.equal(2);
	});
	it('GET /hello should return Hello World', done => {
		supertest(app)
			.get('/hello')
			.expect('Content-type', /text/)
			.expect(200)
			.end((err, res) => {
				expect(res.text).to.be.equal('Hello World');
				done();
			});
	});
});
