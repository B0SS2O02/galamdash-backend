const verify = require('../../controllers/client/verify')
const Draft = require('../../controllers/client/draft.controller.js')
const router = require('express').Router()


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

router.get('/', Draft.list)

router.get('/:id', Draft.view)

router.post('/', upload.single('img'), Draft.create)

router.put('/:id', Draft.edit)

module.exports = router