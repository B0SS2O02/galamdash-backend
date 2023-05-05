const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    try {
        const page = req.query.page - 1 || 0
        const user = req.query.userId || 0
        const my = req.query.my || false
        const count = req.query.count || 10
        let where = {}
        if (my) {
            if (!!req.id) {
                where['creatorId'] = req.id
            }
        } else {
            if (user > 0) {
                where['creatorId'] = user
            }
        }
        const Posts = await models.Posts.findAll({
            where: where,
            attributes: ['id', 'title', 'img', 'creatorId'],
            offset: page * count,
            limit: count
        })
        check.send(Posts, res)
    } catch (error) {
        console.log(error)
    }

}

exports.view = async (req, res) => {
    try {
        if (check.variables(['id'], req.params, res)) {
            const post = await models.Posts.findOne({
                include: [{
                    model: models.Categories,
                    attributes: ['id', 'title']
                }],
                attributes: ['id', 'title', 'content', 'img', 'info', ['createdAt', 'time']],
                where: {
                    id: req.params.id
                }
            })
            check.send(post, res)
        }
    } catch (error) {
        console.log(error)
    }

}