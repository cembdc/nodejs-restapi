const chai = require('chai');
const chaiHttp = require('chai-http');
const { startServer } = require('../src/loaders/express');
const userRepository = require('../src/repository/userRepository');

const sandbox = sinon.createSandbox();

describe('Authentication API', () => {
	let dbUser;
	let user;

	beforeEach(async () => {
		dbUser = {
			username: 'Bran Stark',
			email: 'branstark@gmail.com',
			password: 'mypassword'
		};

		user = {
			email: 'sousa.dfs@gmail.com',
			password: '123456',
			name: 'Daniel Sousa'
		};

		await userRepository.createUser(dbUser);
	});

	describe('POST v1/auth/register', () => {
		it('should register a new user when request is ok', done => {
			chai.request(startServer)
				.get('/api/v1/auth/register')
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.be.a('array');
					// res.body.length.should.be.eql(0);
					done();
				});
		});

		it('should report error when email already exists', done => {
			chai.request(startServer)
				.get('/api/v1/auth/register')
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.be.a('array');
					// res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('POST /v1/auth/register', () => {
		it('should register a new user when request is ok', () => {
			return request(app)
				.post('/v1/auth/register')
				.send(user)
				.expect(httpStatus.CREATED)
				.then(res => {
					delete user.password;
					expect(res.body.token).to.have.a.property('accessToken');
					expect(res.body.token).to.have.a.property('refreshToken');
					expect(res.body.token).to.have.a.property('expiresIn');
					expect(res.body.user).to.include(user);
				});
		});

		it('should report error when email already exists', () => {
			return request(app)
				.post('/v1/auth/register')
				.send(dbUser)
				.expect(httpStatus.CONFLICT)
				.then(res => {
					const { field } = res.body.errors[0];
					const { location } = res.body.errors[0];
					const { messages } = res.body.errors[0];
					expect(field).to.be.equal('email');
					expect(location).to.be.equal('body');
					expect(messages).to.include('"email" already exists');
				});
		});

		it('should report error when the email provided is not valid', () => {
			user.email = 'this_is_not_an_email';
			return request(app)
				.post('/v1/auth/register')
				.send(user)
				.expect(httpStatus.BAD_REQUEST)
				.then(res => {
					const { field } = res.body.errors[0];
					const { location } = res.body.errors[0];
					const { messages } = res.body.errors[0];
					expect(field).to.be.equal('email');
					expect(location).to.be.equal('body');
					expect(messages).to.include('"email" must be a valid email');
				});
		});

		it('should report error when email and password are not provided', () => {
			return request(app)
				.post('/v1/auth/register')
				.send({})
				.expect(httpStatus.BAD_REQUEST)
				.then(res => {
					const { field } = res.body.errors[0];
					const { location } = res.body.errors[0];
					const { messages } = res.body.errors[0];
					expect(field).to.be.equal('email');
					expect(location).to.be.equal('body');
					expect(messages).to.include('"email" is required');
				});
		});
	});

	describe('POST /v1/auth/login', () => {
		it('should return an accessToken and a refreshToken when email and password matches', () => {
			return request(app)
				.post('/v1/auth/login')
				.send(dbUser)
				.expect(httpStatus.OK)
				.then(res => {
					delete dbUser.password;
					expect(res.body.token).to.have.a.property('accessToken');
					expect(res.body.token).to.have.a.property('refreshToken');
					expect(res.body.token).to.have.a.property('expiresIn');
					expect(res.body.user).to.include(dbUser);
				});
		});

		it('should report error when email and password are not provided', () => {
			return request(app)
				.post('/v1/auth/login')
				.send({})
				.expect(httpStatus.BAD_REQUEST)
				.then(res => {
					const { field } = res.body.errors[0];
					const { location } = res.body.errors[0];
					const { messages } = res.body.errors[0];
					expect(field).to.be.equal('email');
					expect(location).to.be.equal('body');
					expect(messages).to.include('"email" is required');
				});
		});

		it('should report error when the email provided is not valid', () => {
			user.email = 'this_is_not_an_email';
			return request(app)
				.post('/v1/auth/login')
				.send(user)
				.expect(httpStatus.BAD_REQUEST)
				.then(res => {
					const { field } = res.body.errors[0];
					const { location } = res.body.errors[0];
					const { messages } = res.body.errors[0];
					expect(field).to.be.equal('email');
					expect(location).to.be.equal('body');
					expect(messages).to.include('"email" must be a valid email');
				});
		});

		it("should report error when email and password don't match", () => {
			dbUser.password = 'xxx';
			return request(app)
				.post('/v1/auth/login')
				.send(dbUser)
				.expect(httpStatus.UNAUTHORIZED)
				.then(res => {
					const { code } = res.body;
					const { message } = res.body;
					expect(code).to.be.equal(401);
					expect(message).to.be.equal('Incorrect email or password');
				});
		});
	});
});
