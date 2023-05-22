const express = require('express');
const verify = require('../../controllers/admin/verify');
const router = express.Router();
const Unconfirmed = require('../../controllers/admin/unconfirmed.controller.js')

router.use(verify)

router.get('/all', Unconfirmed.list)

router.get('/view/:id', Unconfirmed.view)

router.post('/', Unconfirmed.confirm)

module.exports = router;