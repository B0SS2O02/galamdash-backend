const verify = require('../../controllers/admin/verify')
const GreatWords = require('../../controllers/admin/greatwords.controller.js')

const router = require('express').Router()

router.use(verify)

router.get('/', GreatWords.list)

router.get('/:id', GreatWords.view)

router.post('/', GreatWords.add)

router.put('/:id', GreatWords.edit)

router.delete('/:id', GreatWords.del)

module.exports = router