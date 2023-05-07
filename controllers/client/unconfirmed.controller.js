const models = require('../../models')
const check = require('./check')

exports.create = async (req, res, next) => {
    try {
        if (check.variables(['id'], req, res, 'You are not logined')) {
            if (check.variables(['file'], req, res, 'Image not define'))
                if (check.variables(['content', 'info', 'title', 'category'], req.body, res)) {
                    req.body.CategoryId = parseInt(req.body.category)
                    req.body.creatorId = req.id
                    req.body.img = req.file.path
                    const unconfirmed = await models.Unconfirmed.create(
                        req.body
                    )
                    if (!unconfirmed) {
                        res.status(500).json({
                            msg: 'Unconfirmed is not create'
                        })
                    } else {
                        res.json({
                            msg: `Unconfirmed id is : ${unconfirmed.id}`
                        })
                    }

                }
        }

    } catch (error) {
        console.log(error)
    }

}