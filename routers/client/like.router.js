const express = require('express');
const router = express.Router();
const Like = require('../../controllers/client/like.controller.js');
const verify = require('../../controllers/client/verify.js');


router.use(verify)

router.post('/', Like.add)

router.delete('/', Like.del)

<<<<<<< HEAD
=======
router.get('/:id', Like.view)

>>>>>>> master
module.exports = router;