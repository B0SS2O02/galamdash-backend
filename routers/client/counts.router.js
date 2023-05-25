const express = require('express');
const router = express.Router();
const Count = require('../../controllers/client/count.controller.js');
const verify = require('../../controllers/client/verify.js');

router.use(verify)


router.get('/:id', Count.count)


module.exports = router;