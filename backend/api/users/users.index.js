const router = require('express').Router();
const controller = require('./users.controller');

router.post('/', controller.createUser);
router.get('/:userId', controller.getUserById);

module.exports = router;
/*
60058a7d11a9ca0f0aaa9507
60058ce87acd3b0f89cccaed*/
