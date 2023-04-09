const express = require('express');
const router = express.Router();
const Category = require('../../controllers/admin/category.controller.js')

router.use(Category.verify );

router.get('/', Category.list)

router.get('/:id', Category.view)

router.post('/',Category.create)

router.put('/:id',Category.edit)

router.delete('/:id',Category.delete)




module.exports = router;