const router = require('express').Router()
const Post = require('../../controllers/client/post.controller')

router.get('/', Post.random)

module.exports = router