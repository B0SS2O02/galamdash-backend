const GreatWords = require('../../controllers/client/greatwords.controller.js')
const router = require('express').Router()

router.get('/', GreatWords.list)

module.exports = router