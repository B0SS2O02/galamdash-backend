const express = require('express');
const router = express.Router();
const Users = require('../../controllers/admin/users.controller.js')

router.use(Users.verify );

router.get('/', Users.list)

router.get('/:id', Users.view)

router.put('/ban/:id', Users.ban)

router.put('/type/:id', Users.type)



module.exports = router;