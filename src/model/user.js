const mongoose = require('mongoose');

const { stateEnums } = require('./enums/enums.index');
const { cryptUtil } = require('../utils/utils.index');
const { toJSON } = require('./plugins/plugins.index');

const { Schema } = mongoose;

const UserSchema = new Schema({
	username: {
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
		type: String,
		enum: [
			stateEnums.UserState.Active,
			stateEnums.UserState.Blocked,
			stateEnums.UserState.NotVerified,
			stateEnums.UserState.Passive,
			stateEnums.UserState.Suspended
		],
		default: stateEnums.UserState.NotVerified
	},
	createdDateTime: {
		type: Date,
		default: Date.now
	},
	updatedDateTime: {
		type: Date,
		default: Date.now
	},
	verificationCode: {
		type: String
	}
});

UserSchema.plugin(toJSON);

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

UserSchema.pre('updateOne', function(next) {
	this._update.updatedDateTime = new Date();
	next();
});

const User = mongoose.model('user', UserSchema);

exports.User = User;
