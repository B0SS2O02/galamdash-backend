const express = require('express');
const router = express.Router();
const Post = require('../../controllers/admin/post.controller.js')
const Verify = require('../../controllers/admin/verify.js')


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

router.use(Verify)

router.get('/', Post.list)

router.get('/view/:id', Post.view)

router.put('/ban/:id', Post.ban)

router.delete('/:id', Post.del)

router.put('/:id',upload.single('img'), Post.edit)

module.exports = router;