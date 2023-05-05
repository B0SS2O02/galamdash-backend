const express = require('express');
const router = express.Router();
const Like = require('../../controllers/admin/like.controller.js')
const Verify =require('../../controllers/admin/verify.js')

router.use(Verify)

router.get('/', Like.list)

router.get('/view', Like.view)

module.exports = router;