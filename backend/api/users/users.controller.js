const argon2 = require('argon2');
const User = require('../../models/user');

module.exports = {
	createUser: async (req, res, next) => {
		const {name, email, password} = req.body;
		
		try {
			const hashedPassword = await argon2.hash(password);
		
			const user = await new User({name, email, password});
		
			if(!user) throw new Error("Can't create user");
			
			user.save()
			.then((newUser) => {
				return res.json(newUser).status(200);
			}).catch(err => {
				throw new Error(err);
			})
			
		} catch(e) {
			console.log(e);
			next(e);
		}
	},
	
	getUserById: async (req, res, next) => {
		const {userId} = req.params;
		
		try {
			const user = await User.findOne({_id: userId}).populate('posts').exec();
			if(!user) throw new Error("Can't find user");
			
			res.json(user).status(200)
		} catch(e) {
			console.log(e);
			next(e);
		}
	}
}