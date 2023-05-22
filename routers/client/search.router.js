const router = require('express').Router()
const Post = require('../../controllers/client/post.controller')

router.use(Post.search)

module.exports = router