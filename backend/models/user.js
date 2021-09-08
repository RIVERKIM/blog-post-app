const mongoose = require('mongoose');
const Posts = require('./posts');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	
	posts: [{type: mongoose.Types.ObjectId, ref: 'Posts'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;