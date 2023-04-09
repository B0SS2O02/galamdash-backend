const express = require('express');
const router = express.Router();
const Like = require('../../controllers/admin/like.controller.js')

router.use(Like.verify)

router.get('/', Like.list)

router.get('/:id', Like.view)

module.exports = router;