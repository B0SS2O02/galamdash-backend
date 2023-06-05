const Reklama = require('../../controllers/client/reklama.controller.js')
const router = require('express').Router()

router.get('/', Reklama.list)

module.exports = router