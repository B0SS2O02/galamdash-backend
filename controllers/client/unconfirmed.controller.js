const models = require('../../models')
exports.create = async (req, res, next) => {
    try {
        if (!req.id) {
            res.status(400).json({
                msg: 'You are not logined'
            })
            next()
        }
        if (!req.file) {
            res.status(400).json({
                msg: 'Image not define'
            })
            next()
        } else {
            req.body.img = req.file.path
        }
        if (!req.body.content) {
            res.status(400).json({
                msg: 'Content not define'
            })
            next()
        }
        if (!req.body.info) {
            res.status(400).json({
                msg: 'Info not define'
            })
            next()
        }
        if (!req.body.title) {
            res.status(400).json({
                msg: 'Title not define'
            })
            next()
        }
        if (!req.body.category) {
            res.status(400).json({
                msg: 'Category not define'
            })
            next()
        } else {
            req.body.category = parseInt(req.body.category)
        }
        
        req.body.CategoryId = req.body.category
        req.body.creatorId = req.id
        console.log(req.body, req.file)
        const unconfirmed = await models.Unconfirmed.create(
            req.body
        )
        if (!unconfirmed) {
            res.status(500).json({
                msg: 'Unconfirmed is not create'
            })
            next()
        }
        res.json({
            msg: `Unconfirmed id is : ${unconfirmed.id}`
        })
    } catch (error) {
        console.log(error)
    }

}