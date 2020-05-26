const { User } = require('../model/user');

/**
 * @description Gets the all users
 *
 * @returns {Promise<[{users}]>}
 * user object array
 */
exports.getAllUsers = async () => {
	try {
		return User.find();
	} catch (error) {
		throw error;
	}
};

/**
 * @description Gets the all users
 * @param id {property} User Id
 * @returns {Promise<[{users}]>}
 * user object array
 */
exports.getUser = async id => {
	try {
		return User.findOne({ _id: id });
	} catch (error) {
		throw error;
	}
};

/**
 * @description Create User
 * @param user {object} Object containing all required fields to
 * create user
 */
exports.createUser = async user => {
	try {
		const userModel = new User(user);
		return userModel.save();
	} catch (error) {
		throw error;
	}
};

/**
 * @description Update User
 * @param user {object} Object containing all required fields to
 * update user
 */
exports.updateUser = async user => {
	try {
		await User.updateOne(user);
	} catch (error) {
		throw error;
	}
};

/**
 * @description Gets the user by email and password
 * @param email {property} Email
 * @param password {property} Password
 * @returns {Promise<[{user}]>}
 * user object
 */
exports.getUserByLoginInfo = async (email, password) => {
	try {
		return User.findOne({ email, password });
	} catch (error) {
		throw error;
	}
};

/**
 * @description Gets the user by email
 * @param email {property} Email
 * @returns {Promise<[{user}]>}
 * user object
 */
exports.getUserByEmail = async email => {
	try {
		return User.findOne({ email });
	} catch (error) {
		throw error;
	}
};
