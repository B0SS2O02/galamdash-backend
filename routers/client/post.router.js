const express = require('express');
const router = express.Router();
const Post = require('../../controllers/client/post.controller.js');
const verify = require('../../controllers/client/verify.js');

router.use(verify)

router.get('/', Post.list)

router.get('/:id', Post.view)





module.exports = router;