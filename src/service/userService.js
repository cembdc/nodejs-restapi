const jwt = require('jsonwebtoken');
const { userRepository } = require('../repository/repository.index');
const { cryptUtil } = require('../utils/utils.index');
const { stateEnums } = require('../model/enums/enums.index');
const { config } = require('../config/config');
const emailService = require('./emailService');

/**
 * @description Gets the all users
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: [*]}>}
 * {success: false, error: any} or {success: true, data: [users]}
 */
exports.getAllUsers = async () => {
	try {
		const users = await userRepository.getAllUsers();

		return { success: true, data: users };
	} catch (error) {
		throw { success: false, error: any };
	}
};

/**
 * @description Gets user by id
 * @param id {property} User Id
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: user}>}
 * {success: false, error: any} or {success: true, data: {user}}
 */
exports.getUser = async id => {
	try {
		const user = await userRepository.getUser(id);

		return { success: true, data: user };
	} catch (error) {
		throw { success: false, error: any };
	}
};

/**
 * @description Create User
 * @param user {object} Object containing all required fields to
 * create user
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean}>}
 * {success: false, error: any} or {success: true}
 */
exports.createUser = async user => {
	try {
		await userRepository.createUser(user);

		return { success: true };
	} catch (error) {
		throw { success: false, error: any };
	}
};

/**
 * @description UpdateUser User
 * @param user {object} Object containing all required fields to
 * update user
 *
 * @returns {Promise<{success: boolean, error: *} | {success: boolean}>}
 * {success: false, error: any} or {success: true}
 */
exports.updateUser = async user => {
	try {
		await userRepository.updateUser(user);

		return { success: true };
	} catch (error) {
		throw { success: false, error: any };
	}
};

/**
 * @description Authenticate user by email and password
 * @param email {property} Email
 * @param password {property} Password
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: user}>}
 * {success: false, error: any} or {success: true, data: {user}}
 */
exports.authenticateUser = async (email, password) => {
	try {
		const hashedPassword = cryptUtil.encode(password);
		const user = await userRepository.getUserByLoginInfo(email, hashedPassword);

		if (!user || user.state !== stateEnums.UserState.ACTIVE) return { success: false };

		const token = jwt.sign(
			{
				userId: user._id,
				email: user.email
			},
			config.token_config.secret,
			{
				expiresIn: config.token_config.expiresIn
			}
		);

		return { success: true, data: token };
	} catch (error) {
		throw { success: false, error };
	}
};

/**
 * @description Gets user by email and sends an email with code to renew password
 * @param email {property} Email
 * @returns {Promise<{success: boolean, error: *} | {success: boolean, data: user}>}
 * {success: false, error: any} or {success: true, data: {user}}
 */
exports.forgotPasswordRequest = async email => {
	try {
		const user = await userRepository.getUserByEmail(email);

		if (!user) return { success: false };

		const hashedCode = cryptUtil.encode(user.email);

		emailService.sendForgotPasswordMail({
			toAddress: user.email,
			userName: user.userName,
			code: hashedCode
		});

		return { success: true, data: user };
	} catch (error) {
		throw { success: false, error: any };
	}
};
