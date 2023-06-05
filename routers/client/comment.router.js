const express = require('express')
const router = express.Router()
const Comment = require('../../controllers/client/comment.controller.js')
const verify = require('../../controllers/client/verify.js')

router.use(verify)

router.get('/main', Comment.main)

router.get('/:id', Comment.list)

router.post('/', Comment.add)



module.exports = router