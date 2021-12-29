const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	created_at: Date,
});

module.exports = model('User', userSchema);
