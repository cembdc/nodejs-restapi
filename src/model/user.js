const mongoose = require('mongoose');

const { stateEnums } = require('./enums/enums.index');
const { cryptUtil } = require('../utils/utils.index');

const { Schema } = mongoose;

const UserSchema = new Schema({
	userName: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	state: {
		type: Number,
		enum: [
			stateEnums.UserState.ACTIVE,
			stateEnums.UserState.BLOCKED,
			stateEnums.UserState.NOT_VERIFIED,
			stateEnums.UserState.PASSIVE,
			stateEnums.UserState.SUSPEND
		],
		default: stateEnums.UserState.NOT_VERIFIED
	},
	createdDateTime: {
		type: Date,
		default: Date.now
	},
	updatedDateTime: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', function(next) {
	const user = this;
	if ((this.isModified('password') || this.isNew) && user.password) {
		const hash = cryptUtil.encode(user.password);

		user.password = hash;
		next();
	} else {
		return next();
	}
});

const User = mongoose.model('user', UserSchema);

exports.User = User;
