const express = require('express');
const router = express.Router();
const Post = require('../../controllers/admin/post.controller.js')
const Verify = require('../../controllers/admin/verify.js')


const multer = require('multer');
const { check, body } = require('express-validator');
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

router.put('/:id', upload.single('img'), Post.edit)

router.post('/',
    upload.single('img'),
    check('img').custom((value, { req }) => {
        if (req.file) {
            return true
        } else {
            return false
        }
    }),
    body('content').notEmpty(),
    body('info').notEmpty(),
    body('title').notEmpty(),
    body('category').notEmpty(),
    Post.create)

module.exports = router;