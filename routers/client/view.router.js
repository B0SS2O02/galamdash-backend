const verify = require('../../controllers/client/verify')
const View=require('../../controllers/client/view.controller.js')

const router = require('express').Router()

router.use(verify)

router.get('/',View.list)

module.exports = router