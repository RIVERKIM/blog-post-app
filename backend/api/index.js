const express = require("express");
const router = express.Router();
const posts = require('./posts/posts.index');
const users = require('./users/users.index');
const auth = require('./auth/auth.index');

router.use('/auth', auth);
router.use('/posts', posts);
router.use('/users',users);

module.exports = router;
