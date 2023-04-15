const express = require('express');
const router = express.Router();
const Category = require('../../controllers/admin/category.controller.js')
const Verify =require('../../controllers/admin/verify.js')

router.use(Verify );

router.get('/', Category.list)

router.get('/:id', Category.view)

router.post('/',Category.create)

router.put('/:id',Category.edit)

router.delete('/:id',Category.delete)




module.exports = router;