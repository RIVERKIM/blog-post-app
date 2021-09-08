const mongoose = require('mongoose');
const User = require('./user');

const PostsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: true
	},
	date: {
		type: Date,
		default: new Date().toISOString()
	},
	reactions: {
		thumbsUp: {
			type: Number,
			default: 0
		},
    	hooray: {
			type: Number,
			default: 0
		},
        heart: {
			type: Number,
			default: 0
		},
    	rocket: {
			type: Number,
			default: 0
		},
    	eyes: {
			type: Number,
			default: 0
		}
	}
	
})

const Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;