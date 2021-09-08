const Posts = require('../../models/posts');
const User = require('../../models/user');

module.exports = {
	getAllPosts: async (req, res, next) => {
		
		try {
			const allPosts = await Posts.find({});
			if(!allPosts) throw new Error("Can't find posts")
				
			return res.json(allPosts).status(200);
		} catch(e) {
			console.log(e);
			next(e);
		} 
	},
	
	getPostsById: async (req, res, next) => {
		const {postId} = req.params;
		
		try {
			const post = await Posts.findOne({_id: postId});
			if(!post) throw new Error("Can't find post")
			
			
			return res.json(post).status(200);
		} catch(e) {
			console.log(e);
			next(e);
		}
	},
	
	createPost: async (req, res, next) => {
		const {post} = req.body;
		console.log(post);
		try {
			const newPost = await new Posts({title: post.title, content: post.content, user: post.user});
			const user = await User.findOne({_id: post.user});
			
			if(!newPost) throw new Error("Cant't create Post");
			user.posts.push(newPost);
			
			Promise.all([newPost.save(), user.save()])
				.then(values => {
				res.json(values[0]).status(200);
			}).catch(err => {
				throw new Error(err);
			})
			
		} catch(e) {
			console.log(e);
			next(e);
		}

	},
	
	updatePost: async (req, res, next) => {
		const {postId} = req.params;
		const {post} = req.body;
		
		try {
			
			const prevPost = await Posts.find({_id: postId});
			if(!prevPost) throw new Error("Can't not find Post");
			
			prevPost.title = post.title;
			prevPost.content = post.content;
			prevPost.reactions = post.reactions;
			prevPost.date = new Date().toISOString()
			
			prevPost.save().then((post) => {
				return res.json(post).status(200);
			}).catch(err => {throw new Error(err)});
			
		} catch(e) {
			console.log(e);
			next(e);
		}
	}
}

