const express = require('express')
const router = express.Router()
const Tag = require('../../controllers/client/tag.controller.js')

router.get('/', Tag.list)

router.get('/:id', Tag.view)

module.exports = router