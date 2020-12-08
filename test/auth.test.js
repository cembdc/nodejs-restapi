const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../src/loaders/express');
// const userRepository = require('../src/repository/userRepository');
const setupTestDB = require('./utils/setupTestDB');

setupTestDB();

describe('Authentication API', () => {
	let dbUser;
	let user;

	beforeEach(async () => {
		dbUser = {
			name: 'Bran Stark',
			email: 'branstark@gmail.com',
			password: 'mypassword'
		};

		user = {
			email: 'cembdci@gmail.com',
			password: '123ljkD3ed',
			name: 'Cem Bideci'
		};

		// await userRepository.createUser(dbUser);
	});

	describe('POST /api/v1/auth/register', () => {
		it('should register a new user when request is ok', () => {
			return request(app)
				.post('/api/v1/auth/register')
				.send(user)
				.expect(httpStatus.OK)
				.then(res => {
					expect(res.body).to.have.a.property('success');
					expect(res.body).to.have.a.property('message');
					const { message } = res.body;
					const { success } = res.body;
					expect(success).to.be.equal(true);
					expect(message).to.include('Succesfull');

					// expect(res.body).to.have.a.property('error');
					// expect(res.body).to.have.a.property('message');
					// expect(res.body).to.have.a.property('data');
					// expect(res.body.user).to.include(user);
				});
		});

		// it('should report error when email already exists', () => {
		// 	return request(app)
		// 		.post('/v1/auth/register')
		// 		.send(dbUser)
		// 		.expect(httpStatus.CONFLICT)
		// 		.then(res => {
		// 			const { field } = res.body.errors[0];
		// 			const { location } = res.body.errors[0];
		// 			const { messages } = res.body.errors[0];
		// 			expect(field).to.be.equal('email');
		// 			expect(location).to.be.equal('body');
		// 			expect(messages).to.include('"email" already exists');
		// 		});
		// });

		// it('should report error when the email provided is not valid', () => {
		// 	user.email = 'this_is_not_an_email';
		// 	return request(app)
		// 		.post('/v1/auth/register')
		// 		.send(user)
		// 		.expect(httpStatus.BAD_REQUEST)
		// 		.then(res => {
		// 			const { field } = res.body.errors[0];
		// 			const { location } = res.body.errors[0];
		// 			const { messages } = res.body.errors[0];
		// 			expect(field).to.be.equal('email');
		// 			expect(location).to.be.equal('body');
		// 			expect(messages).to.include('"email" must be a valid email');
		// 		});
		// });

		// it('should report error when email and password are not provided', () => {
		// 	return request(app)
		// 		.post('/v1/auth/register')
		// 		.send({})
		// 		.expect(httpStatus.BAD_REQUEST)
		// 		.then(res => {
		// 			const { field } = res.body.errors[0];
		// 			const { location } = res.body.errors[0];
		// 			const { messages } = res.body.errors[0];
		// 			expect(field).to.be.equal('email');
		// 			expect(location).to.be.equal('body');
		// 			expect(messages).to.include('"email" is required');
		// 		});
		// });
	});

	// describe('POST /v1/auth/login', () => {
	// 	it('should return an accessToken and a refreshToken when email and password matches', () => {
	// 		return request(app)
	// 			.post('/v1/auth/login')
	// 			.send(dbUser)
	// 			.expect(httpStatus.OK)
	// 			.then(res => {
	// 				delete dbUser.password;
	// 				expect(res.body.token).to.have.a.property('accessToken');
	// 				expect(res.body.token).to.have.a.property('refreshToken');
	// 				expect(res.body.token).to.have.a.property('expiresIn');
	// 				expect(res.body.user).to.include(dbUser);
	// 			});
	// 	});

	// 	it('should report error when email and password are not provided', () => {
	// 		return request(app)
	// 			.post('/v1/auth/login')
	// 			.send({})
	// 			.expect(httpStatus.BAD_REQUEST)
	// 			.then(res => {
	// 				const { field } = res.body.errors[0];
	// 				const { location } = res.body.errors[0];
	// 				const { messages } = res.body.errors[0];
	// 				expect(field).to.be.equal('email');
	// 				expect(location).to.be.equal('body');
	// 				expect(messages).to.include('"email" is required');
	// 			});
	// 	});

	// 	it('should report error when the email provided is not valid', () => {
	// 		user.email = 'this_is_not_an_email';
	// 		return request(app)
	// 			.post('/v1/auth/login')
	// 			.send(user)
	// 			.expect(httpStatus.BAD_REQUEST)
	// 			.then(res => {
	// 				const { field } = res.body.errors[0];
	// 				const { location } = res.body.errors[0];
	// 				const { messages } = res.body.errors[0];
	// 				expect(field).to.be.equal('email');
	// 				expect(location).to.be.equal('body');
	// 				expect(messages).to.include('"email" must be a valid email');
	// 			});
	// 	});

	// 	it("should report error when email and password don't match", () => {
	// 		dbUser.password = 'xxx';
	// 		return request(app)
	// 			.post('/v1/auth/login')
	// 			.send(dbUser)
	// 			.expect(httpStatus.UNAUTHORIZED)
	// 			.then(res => {
	// 				const { code } = res.body;
	// 				const { message } = res.body;
	// 				expect(code).to.be.equal(401);
	// 				expect(message).to.be.equal('Incorrect email or password');
	// 			});
	// 	});
	// });
});
