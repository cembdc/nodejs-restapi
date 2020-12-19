const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../src/loaders/express');
const userRepository = require('../../src/repository/userRepository');
const { config } = require('../../src/config/config');
const { cryptUtil } = require('../../src/utils/utils.index');
const setupTestDBAndConnection = require('../utils/setupTestDBAndConnection');
const { UserState } = require('../../src/model/enums/stateEnums');

setupTestDBAndConnection();

// app.listen(config.api_config.api_port, () =>
// 	console.log(
// 		`%cAPI Running on: ${config.api_config.api_host}:${config.api_config.api_port}${config.api_config.api_base_url}`,
// 		'color: green'
// 	)
// );

describe('Users API', () => {
	describe('POST /api/v1/user', () => {
		let user;
		let admin;
		let authorizedToken;
		let unAuthorizedToken;

		before(async () => {
			admin = {
				email: 'cemadmin@gmail.com',
				password: '543ljkD3ed',
				name: 'Cem Bideci',
				state: UserState.Active
			};

			user = {
				email: 'jonsnow@gmail.com',
				password: '123ljkD3ed',
				name: 'Jon Snow'
			};

			admin = await userRepository.createUser(admin);

			authorizedToken = cryptUtil.createToken({
				userId: admin.id,
				isLoggedIn: true
			});
		});

		afterEach(async () => {
			// const existUser = await userRepository.getUserByEmail(user.email);
			// const token = cryptUtil.createToken({
			// 	userId: existUser.id,
			// 	isLoggedIn: false
			// });
			// user.verificationCode = existUser.verificationCode;
			// user.token = token;
		});

		it('should create a new user when request is ok', done => {
			request(app)
				.post('/api/v1/user')
				.set('Authorization', `Bearer ${authorizedToken}`)
				.send(user)
				.expect(httpStatus.OK)
				.end((err, res) => {
					expect(res.body).to.have.a.property('success');
					expect(res.body).to.have.a.property('message');
					const { message } = res.body;
					const { success } = res.body;
					expect(success).to.be.equal(true);
					expect(message).to.include('Succesfull');
					done(err);
				});
		});

		it('should report error when email already exists', done => {
			request(app)
				.post('/api/v1/user')
				.set('Authorization', `Bearer ${authorizedToken}`)
				.send(user)
				.expect(httpStatus.NOT_ACCEPTABLE)
				.end((err, res) => {
					expect(res.body).to.have.a.property('success');
					expect(res.body).to.have.a.property('message');
					const { message } = res.body;
					const { success } = res.body;
					expect(success).to.be.equal(false);
					expect(message).to.include('This email is in use');
					done(err);
				});
		});

		it('should report error when email is not provided', done => {
			delete user.email;

			request(app)
				.post('/api/v1/user')
				.set('Authorization', `Bearer ${authorizedToken}`)
				.send(user)
				.expect(httpStatus.UNPROCESSABLE_ENTITY)
				.end((err, res) => {
					expect(res.body).to.have.a.property('errors');
					const { errors } = res.body;
					expect(errors).length.greaterThan(0);
					expect(errors[0].message).to.include('"email" is required');
					done(err);
				});
		});

		// it('should verify register a new user when request is ok', done => {
		// 	request(app)
		// 		.post('/api/v1/auth/verifyregister')
		// 		.send({ token: user.token, code: user.verificationCode })
		// 		.expect(httpStatus.OK)
		// 		.end((err, res) => {
		// 			expect(res.body).to.have.a.property('success');
		// 			expect(res.body).to.have.a.property('message');
		// 			const { message } = res.body;
		// 			const { success } = res.body;
		// 			expect(success).to.be.equal(true);
		// 			expect(message).to.include('Succesfull');
		// 			done(err);
		// 		});
		// });
	});

	describe('POST /api/v1/auth/register Invalid Inputs', () => {
		// let dbUser;
		// before(async () => {
		// 	dbUser = {
		// 		email: 'cembdci@gmail.com',
		// 		password: '123ljkD3ed',
		// 		name: 'Cem Bideci'
		// 	};
		// });
		// it('should report error when email already exists', done => {
		// 	request(app)
		// 		.post('/api/v1/auth/register')
		// 		.send(dbUser)
		// 		.expect(httpStatus.NOT_ACCEPTABLE)
		// 		.end((err, res) => {
		// 			expect(res.body).to.have.a.property('success');
		// 			expect(res.body).to.have.a.property('message');
		// 			const { message } = res.body;
		// 			const { success } = res.body;
		// 			expect(success).to.be.equal(false);
		// 			expect(message).to.include('This email is in use');
		// 			done(err);
		// 		});
		// });
		// it('should report error when the email provided is not valid', done => {
		// 	dbUser.email = 'this_is_not_an_email';
		// 	request(app)
		// 		.post('/api/v1/auth/register')
		// 		.send(dbUser)
		// 		.expect(httpStatus.UNPROCESSABLE_ENTITY)
		// 		.end((err, res) => {
		// 			expect(res.body).to.have.a.property('errors');
		// 			const { errors } = res.body;
		// 			expect(errors).length.greaterThan(0);
		// 			expect(errors[0].message).to.include('"email" must be a valid email');
		// 			done(err);
		// 		});
		// });
		// it('should report error when email and password are not provided', done => {
		// 	request(app)
		// 		.post('/api/v1/auth/register')
		// 		.send({})
		// 		.expect(httpStatus.UNPROCESSABLE_ENTITY)
		// 		.end((err, res) => {
		// 			expect(res.body).to.have.a.property('errors');
		// 			const { errors } = res.body;
		// 			expect(errors).length.greaterThan(0);
		// 			expect(errors[0].message).to.include('"email" is required');
		// 			done(err);
		// 		});
		// });
	});
});
