const express = require('express');
const router = express.Router();
const Like = require('../../controllers/client/like.controller.js')



router.post('/:id', Like.add)

module.exports = router;