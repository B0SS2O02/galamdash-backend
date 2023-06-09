const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    try {
        const page = req.query.page - 1 || 0
        const count = req.query.count || 10
        const user = req.query.userId || 0
        const my = req.query.my || false
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
        const NotEmpty = (value) => {
            value = JSON.parse(JSON.stringify(value))
            if (value.length == 0) {
                return 0
            } else {
                return value.count
            }
        }
        let post = JSON.parse(JSON.stringify(Posts))
        for (let i = 0; i < post.length; i++) {
            let Var = []
            Var = await models.Likes.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: post[i].id
                }
            })
            post[i]['like'] = NotEmpty(Var)
            Var = await models.Views.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: post[i].id
                }
            })
            post[i]['view'] = NotEmpty(Var)
            Var = await models.Comments.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: post[i].id
                }
            })
            post[i]['comment'] = NotEmpty(Var)
        }

        check.send(post, res)
    } catch (error) {
        console.log(error)
    }

}

exports.view = async (req, res) => {
    try {
        if (check.variables(['id'], req.params, res)) {
            let where = {}
            if (!!req.id) {
                console.log('postview',req.params.id,req.id)
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
            console.log('id',req.params.id)
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
            console.log('1',post)
            let POST = JSON.parse(JSON.stringify(post))
            let Var = 0

            const NotEmpty = (value) => {
                value = JSON.parse(JSON.stringify(value))
                if (value.length == 0) {
                    return 0
                } else {
                    return value.count
                }
            }
            console.log(POST)
            Var = await models.Likes.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: POST.id
                }
            })
            POST['like'] = NotEmpty(Var)
            Var = await models.Views.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: POST.id
                }
            })
            POST['view'] = NotEmpty(Var)
            Var = await models.Comments.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: POST.id
                }
            })
            POST['comment'] = NotEmpty(Var)
            check.send(POST, res)
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
            let post = JSON.parse(JSON.stringify(posts))
            for (let i = 0; i < post.length; i++) {
                let Var = []
                Var = await models.Likes.findOne({
                    attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                    where: {
                        post: POST[i].id
                    }
                })
                post[i]['like'] = NotEmpty(Var)
                Var = await models.Views.findOne({
                    attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                    where: {
                        post: post[i].id
                    }
                })
                post[i]['view'] = NotEmpty(Var)
                Var = await models.Comments.findOne({
                    attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                    where: {
                        post: post[i].id
                    }
                })
                post[i]['comment'] = NotEmpty(Var)
            }
            res.json(post)
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

        const NotEmpty = (value) => {
            value = JSON.parse(JSON.stringify(value))
            if (value.length == 0) {
                return 0
            } else {
                return value.count
            }
        }

        let post = JSON.parse(JSON.stringify(posts))
        for (let i = 0; i < post.length; i++) {
            let Var = []
            Var = await models.Likes.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: post[i].id
                }
            })
            post[i]['like'] = NotEmpty(Var)
            Var = await models.Views.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: post[i].id
                }
            })
            post[i]['view'] = NotEmpty(Var)
            Var = await models.Comments.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: post[i].id
                }
            })
            post[i]['comment'] = NotEmpty(Var)
        }
        res.json(post)
    } catch (error) {
        console.log(error)
    }
}

exports.create = async (req, res) => {
    try {
        if (check.variables(['id'], req, res, 'You are not logined')) {
            if (check.variables(['file'], req, res, 'Image not define')) {
                if (check.variables(['content', 'info', 'title'], req.body, res)) {
                    req.body.CategoryId = parseInt(req.body.category)
                    req.body.creatorId = req.id
                    req.body.img = req.file.path
                    const draft = await models.Posts.create(
                        req.body
                    )
                    if (!draft) {
                        res.status(500).json({
                            msg: 'Post is not create'
                        })
                    } else {
                        res.json({
                            msg: `Post id is : ${draft.id}`
                        })
                    }

                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}
