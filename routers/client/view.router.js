const verify = require('../../controllers/client/verify')
<<<<<<< HEAD
const View=require('../../controllers/client/view.controller.js')
=======
const View = require('../../controllers/client/view.controller.js')
>>>>>>> master

const router = require('express').Router()

router.use(verify)

<<<<<<< HEAD
router.get('/',View.list)
=======
router.get('/', View.list)

router.get('/:id', View.view)
>>>>>>> master

module.exports = router