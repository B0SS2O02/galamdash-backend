const verify = require('../../controllers/admin/verify')

const router = require('express').Router()

const Reklama = require('../../controllers/admin/reklama.controller')

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

router.get('/', Reklama.list)

router.get('/:id', Reklama.view)

router.post('/', upload.single('img'), Reklama.add)

router.put('/:id', upload.single('img'), Reklama.edit)

router.delete('/:id', Reklama.del)

module.exports = router