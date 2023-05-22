const express = require('express');
const router = express.Router();
const Admin = require('../../controllers/admin/admin.controller.js')
const Verify =require('../../controllers/admin/verify.js')

router.use(Verify);

router.get('/count', Admin.count)






module.exports = router;