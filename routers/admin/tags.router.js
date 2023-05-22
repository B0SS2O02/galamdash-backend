const router = require('express').Router()

const Tags = require('../../controllers/admin/tag.controller.js')
const verify = require('../../controllers/admin/verify.js')

router.use(verify)

router.post('/', Tags.add)

router.delete('/:id', Tags.del)

module.exports = router