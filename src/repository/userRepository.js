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
 * @description Attempt to create a post with the provided object
 * @param postToCreate {object} Object containing all required fields to
 * create post
 * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
 */
// exports.getAllUsers = async () => User.find();
