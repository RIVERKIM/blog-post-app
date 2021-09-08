const controller = require('./auth.controller');
const { celebrate, Joi, errors, Segments } = require('celebrate');
const router = require('express').Router();

router.post('/signIn', celebrate({
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
}), controller.signIn);

router.post('/signUp', celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
}), controller.signUp)

module.exports = router;