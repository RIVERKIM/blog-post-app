const User = require('../../models/user');
const argon2 = require('argon2');
const {celebrate, Joi} = require('celebrate');
module.exports = {
	signIn: async (req, res, next) => {
		const {email, password} = req.body;
		
		try {
			const user = await User.findOne({email}).populate('posts').exec();
			
			if(!user) {
				throw new Error("Can't find email....");
			}
			
			const canSignIn = await argon2.verify(user.password, password);
			
			if(canSignIn) {
				Reflect.deleteProperty(user, 'password');
				res.json(user);
			} else {
				res.json(null);
			}
		}catch(err) {
			console.log(err);
			next(err);
		}
	},
	
	signUp: async (req, res, next) => {
		const {name, email, password} = req.body;
		
		try {
			const hashedPassword = argon2.hash(password);
			const user = await new User({name, email: hashedPassword, password});
			
			if(!user) {
				throw new Error("Can't create user");
			}
			
			user.save().then(() => {
				res.json(true)
			}).catch(err => console.log(err));
		}catch(err) {
			console.log(err);
			next(err);
		}
	}
}