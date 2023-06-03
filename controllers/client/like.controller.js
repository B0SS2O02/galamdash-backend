const models = require('../../models')
const check = require('./check')

exports.add = async (req, res) => {
    try {
        if (check.variables(['id'], req, res, 'You are not logined')) {
            if (check.variables(['post', 'type'], req.body, res)) {
                let post = await models.Posts.findOne({
                    where: {
                        id: req.body.post
                    }
                })
                if (check.check(post, res)) {
                    await models.Likes.create({
                        post: req.body.post,
                        user: req.id,
                        type: req.body.type
                    }).catch((err) => {
                        res.status(500).json(err)
                    }).then((result) => {
                        res.json(result)
                    })
                }
            }
        }

    } catch (error) {
        console.log(error)
    }
}

exports.del = async (req, res) => {
    try {
        check.variables(['post'], req.body, res)
        check.variables(['id'], req, res, 'You are not logined')
        const like = await models.Likes.destroy({
            where: {
                post: req.body.post,
                user: req.id
            }
        })
        if (like) {
            res.json({ msg: 'Like deleted' })
        } else {
            res.json({ msg: 'Like not deleted' })
        }

    } catch (error) {
        console.log(error)
    }
}


exports.list = async (req, res) => {
    if (check.variables(['id'], req, res, 'You are not logineв')) {
        const view = await models.Likes.findAll({
            where: {
                user: req.id,
                type: 'like'
            },
            attributes: ['id', ['updatedAt', 'time']],
            include: {
                model: models.Posts,
                attributes: ['id', 'title', 'content', 'img']
            }
        })
        check.send(view, res)
    }
}
