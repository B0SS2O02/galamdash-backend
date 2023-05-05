const express = require('express');
const router = express.Router();
const Like = require('../../controllers/client/like.controller.js');
const verify = require('../../controllers/client/verify.js');


router.use(verify)

router.post('/:id', Like.add)

module.exports = router;