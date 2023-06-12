const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    try {
        const category = await models.Categories.findAll({
            attributes: ['id', 'title']
        })
        check.send(category, res)
    } catch (error) {
        console.log(error)
    }

}

exports.view = async (req, res) => {
    try {
        if (req.params.id == 0) {

            const post_ids = await models.Posts.findAll({
                attributes: ['id']
            })
            let ids = []
            while (ids.length < 11) {
                const index=Math.floor(Math.random() * post_ids.length)
                ids.push(post_ids[index].id)
                console.log(index)
            }
            
            const posts = await models.Posts.findAll({
                where: {
                    id: ids
                },
                attributes: ['id', 'title', 'img', 'content', 'info', ['createdAt', 'time']],
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
            res.json({ Posts: post })


        } else {
            const category = await models.Categories.findOne({
                attributes: ['id', 'title'],
                include: [{
                    model: models.Posts,
                    attributes: ['id', 'img', 'content', 'title', 'info', ['createdAt', 'time']],
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
                    }]
                }],
                where: {
                    id: req.params.id
                }

            })
            let post = JSON.parse(JSON.stringify(category))
            for (let i = 0; i < post.Posts.length; i++) {
                let Var = []
                Var = await models.Likes.findOne({
                    attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                    where: {
                        post: post['Posts'][i].id
                    }
                })
                post['Posts'][i]['like'] = NotEmpty(Var)
                Var = await models.Views.findOne({
                    attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                    where: {
                        post: post['Posts'][i].id
                    }
                })
                post['Posts'][i]['view'] = NotEmpty(Var)
                Var = await models.Comments.findOne({
                    attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                    where: {
                        post: post['Posts'][i].id
                    }
                })
                post['Posts'][i]['comment'] = NotEmpty(Var)
            }
            check.send(post, res)
        }

    } catch (error) {
        console.error(error)
    }

}