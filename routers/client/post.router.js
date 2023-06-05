const express = require('express');
const router = express.Router();
const Post = require('../../controllers/client/post.controller.js');
const verify = require('../../controllers/client/verify.js');

const multer = require('multer');

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

router.get('/', Post.list)

router.get('/:id', Post.view)

router.post('/', upload.single('img'), Post.create)





module.exports = router;