const chai = require('chai');
const chaiHttp = require('chai-http');
const { startServer } = require('../src/loaders/express');

// let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
	beforeEach(done => {
		// Before each test we empty the database
		done();
	});

	/*
	 * Test the /GET route
	 */
	describe('/GET user/usertest', () => {
		it('it should GET test user info', done => {
			chai.request(startServer)
				.get('/api/v1/user/usertest')
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.be.a('array');
					// res.body.length.should.be.eql(0);
					done();
				});
		});
	});
});
