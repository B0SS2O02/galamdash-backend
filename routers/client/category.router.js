const express = require('express');
const router = express.Router();
const Category = require('../../controllers/client/category.controller.js');
const verify = require('../../controllers/client/verify.js');


router.use(verify)

router.get('/', Category.list)

router.get('/:id', Category.view)





module.exports = router;