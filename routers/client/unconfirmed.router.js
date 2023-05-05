const express = require('express')
const verify = require('../../controllers/client/verify')
const router = express.Router()
const Unconfirmed = require('../../controllers/client/unconfirmed.controller.js')

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

router.post('/', upload.single('img'), Unconfirmed.create)

module.exports = router;