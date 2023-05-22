const express = require('express');
const router = express.Router();
const User = require('../../controllers/client/users.controller.js')

const multer = require('multer');
const verify = require('../../controllers/client/verify.js')
const storageConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        let time = new Date().getTime().toString()
        cb(null, time + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storageConfig, fileFilter: fileFilter })

router.use(verify)

router.post('/login', User.login)

router.post('/registry', User.registry)

router.get('/my', User.my)

router.get('/own/:id', User.user)

router.put('/image', upload.single('image'), User.image)

router.put('/edit', User.edit)



module.exports = router;