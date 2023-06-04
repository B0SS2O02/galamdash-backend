const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    try {
        const page = req.query.page - 1 || 0
        const user = req.query.userId || 0
        const my = req.query.my || false
        const count = req.query.count || 10
        const all = req.query.all || false
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
        if (all) {
            order = [
                ['id', 'DESC'],
            ]
        }
        const Posts = await models.Posts.findAll({
            where: where,
            attributes: ['id', 'title', 'img', 'content', 'info', ['createdAt', 'time']],
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: models.Tags,
                attributes: ['id'],
                include: {
                    model: models.TagLists,
                    attributes: ['id', 'title']
                }
            }, {
                model: models.Users,
                attributes: ['id', 'nick', 'email', 'img']
            }],
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
            let where = {}
            if (!!req.id) {
                console.log(req.params.id,
                    req.id)
                const view = await models.Views.findOne({
                    where: {
                        post: req.params.id,
                        user: req.id
                    }
                })
                if (!view) {
                    await models.Views.create(
                        {
                            post: req.params.id,
                            user: req.id
                        }
                    )
                } else {
                    await models.Views.update(
                        { time: new Date() },
                        {
                            where: {
                                post: req.params.id,
                                user: req.id
                            }
                        }
                    )
                }
            }
            const post = await models.Posts.findOne({
                include: [{
                    model: models.Categories,
                    attributes: ['id', 'title']
                }, {
                    model: models.Tags,
                    attributes: ['id'],
                    include: {
                        model: models.TagLists,
                        attributes: ['id', 'title']
                    }
                }, {
                    model: models.Likes,
                    where: where,
                    attributes: ['id', 'type']
                }, {
                    model: models.Users,
                    attributes: ['id', 'nick', 'email', 'img']
                }
                ],
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

exports.search = async (req, res) => {
    try {
        if (check.variables(['word'], req.query, res)) {
            const posts = await models.Posts.findAll({
                where: {
                    title: {
                        [models.Sequelize.Op.like]: `${req.query.word}%`
                    }
                },
                attributes: ['id', 'title', 'img', 'content', 'info', ['createdAt', 'time']],
                order: [
                    ['id', 'DESC'],
                ],
                include: [{
                    model: models.Tags,
                    attributes: ['id'],
                    include: {
                        model: models.TagLists,
                        attributes: ['id', 'title']
                    }
                }, {
                    model: models.Users,
                    attributes: ['id', 'nick', 'email', 'img']
                }, {
                    model: models.Users,
                    attributes: ['id', 'nick', 'email', 'img']
                }],
            })
            res.json(posts)
        }
    } catch (error) {
        console.log(error)
    }
}

exports.random = async (req, res) => {
    try {
        const post_ids = await models.Posts.findAll({
            attributes: ['id']
        })
        let ids = []
        while (ids.length < 11) {
            ids.push(post_ids[Math.floor(Math.random() * post_ids.length)].id)
        }
        const posts = await models.Posts.findAll({
            where: {
                id: ids
            },
            attributes: ['id', 'title', 'img', 'content', 'info', ['createdAt', 'time']],
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: models.Tags,
                attributes: ['id'],
                include: {
                    model: models.TagLists,
                    attributes: ['id', 'title']
                }
            }, {
                model: models.Users,
                attributes: ['id', 'nick', 'email', 'img']
            }],
        })
        res.json(posts)
    } catch (error) {
        console.log(error)
    }
}


