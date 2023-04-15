const express = require('express');
const router = express.Router();
const Users = require('../../controllers/admin/users.controller.js')
const Verify =require('../../controllers/admin/verify.js')

router.use(Verify);

router.get('/all', Users.list)

router.get('/view/:id', Users.view)

router.put('/ban/:id', Users.ban)

router.put('/type/:id', Users.type)

router.get('/search',Users.search)

module.exports = router;