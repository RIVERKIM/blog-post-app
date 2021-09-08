const controller = require('./posts.controller');
const router = require('express').Router();

router.get('/', controller.getAllPosts);
router.get('/:postId', controller.getPostsById);

router.post('/', controller.createPost);
router.post('/:postId', controller.updatePost);

module.exports = router;