const router = require('express').Router()
const models=require('../models')


router.get('/', async (req, res) => {


    const post_ids = await models.Posts.findAll({
        attributes: ['id']
    })
    let ids = []
    while (ids.length < 11) {
        const index = Math.floor(Math.random() * post_ids.length)
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



})

module.exports = router;