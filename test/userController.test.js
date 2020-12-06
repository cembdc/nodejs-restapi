const { expect, assert, should } = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/loaders/express');

// let should = chai.should();

// chai.use(chaiHttp);

describe('User', () => {
	// beforeEach(done => {
	// 	// Before each test we empty the database
	// 	done();
	// });

	/*
	 * Test the /GET route
	 */
	// describe('/GET user/usertest', () => {
	// 	it('it should GET test user info', done => {
	// chai.request(app)
	// 	.get('/api/v1/user/usertest')
	// 	.end((err, res) => {
	// 		res.should.have.status(200);
	// 		// res.body.should.be.a('array');
	// 		// res.body.length.should.be.eql(0);
	// 		done();
	// 	});

	// 		expect(3 * 3).to.equal(9);
	// 	});
	// });

	it('should return 9', () => {
		expect(3 * 3).to.equal(9);
	});
});
