const Reklama = require('../../controllers/client/reklama.controller.js')
const router = require('express').Router()

router.get('/:position', Reklama.list)

module.exports = router