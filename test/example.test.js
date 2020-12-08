const supertest = require('supertest');
const { expect, assert, should } = require('chai');
// const app = require('../src/loaders/express');

describe('Simple Math Test', () => {
	it('should return 2', () => {
		expect(1 + 1).to.equal(2);
	});
	// it('GET /hello should return Hello World', () => {
	// 	supertest(app)
	// 		.get('/hello')
	// 		.expect(200)
	// 		.then(res => {
	// 			expect(res.text).to.be.equal('Hello World');
	// 		});
	// 	// .end((err, res) => {
	// 	// 	expect(res.text).to.be.equal('Hello World');
	// 	// 	done();
	// 	// });
	// });
});
