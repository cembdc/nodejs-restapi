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
 * @description Create User
 * @param user {object} Object containing all required fields to
 * create user
 */
exports.createUser = async user => {
	try {
		return User.save(new User(user));
	} catch (error) {
		throw error;
	}
};
