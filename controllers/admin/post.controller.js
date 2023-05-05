const models = require('../../models')
const fs = require('fs')

exports.list = async (req, res) => {
    try {
        let page = req.query.page - 1 || 0
        let sort = req.query.sort || 'id,ASC'
        const count = 10
        const CatCount = await models.Posts.findAll({
            attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']]
        })
        const category = await models.Posts.findAll({
            order: [[sort.split(',')[0], sort.split(',')[1]]],
            attributes: ['id', 'title', 'img', 'ban', 'ball'],
            include: [{
                model: models.Categories,
                attributes: ['id', 'title']
            }],
            offset: page * count,
            limit: count
        })
        if (!category) {
            res.status(400).json({ msg: 'Posts not define' })
            next()
        }
        res.status(200).json({
            page: page + 1,
            pages: Math.ceil(parseInt(CatCount[0].get('count')) / 10),
            description: 'All categoies list',
            data: category
        })
    } catch (error) {
        console.error(error)
    }
}

exports.view = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).json({
                msg: 'Id parametr is empty'
            })
            next()
        }
        const post = await models.Posts.findOne({
            include: [{
                model: models.Categories,
                attributes: ['id', 'title']
            }, {
                model: models.Users,
                attributes: ['id', 'nick', 'img']
            }, {
                model: models.Likes,
                // attributes: ['id', 'nick', 'img']
            }],
            // attributes: ['id', 'title', 'content', 'img', 'info', 'ball', 'ban', ['createdAt', 'time']],
            where: {
                id: req.params.id
            }

        })
        if (!post) {
            res.status(400).json({
                msg: "Posts undefine"
            })
            next()
        }
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }

}


exports.ban = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({
                msg: 'Id parametr is empty'
            })
            next()
        }
        const user = await models.Posts.findOne({
            attributes: ['ban'],
            where: {
                id: req.params.id
            }
        })
        await models.Posts.update({
            ban: !user.ban
        }, {
            where: {
                id: req.params.id
            }
        });
        let msg
        if (!user.ban == false) {
            msg = `Post by id ${req.params.id} is not baned`
        } else {
            msg = `Post by id ${req.params.id} is baned`
        }
        res.status(200).json({
            msg: msg
        })
    } catch (error) {
        console.error(error)
    }
}

exports.del = async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({ msg: 'Id not define' })
        next()
    }
    const post = await models.Posts.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!post) {
        res.status(404).json({
            msg: 'Post not define'
        })
        next()
    }
    const delet = await models.Posts.destroy({
        where: {
            id: req.params.id
        }
    })
    if (delet) {
        res.json({
            msg: `Post by id ${req.params.id} is deleted`
        })
    } else {
        res.status(400).json({
            msg: `Post by id ${req.params.id} is not deleted`
        })
    }
}
exports.edit = async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id paramets is empty'
        })
        next()
    }
    const post = await models.Posts.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!post) {
        res.status(404).json({
            msg: `Post by id ${req.params.id} is not define`
        })
        next()
    }
    let body = req.body
    if (!!req.file) {
        if (post.img !== "public/images/default_avatar.jpg") {
            fs.unlink(post.img, (err) => {
                if (err) return console.log(err)
            });
        }
        body.img = req.file.path
    }
    if (body.ban == 'true') {
        body.ban = true
    } else {
        body.ban = false
    }
    body.categoryId = parseInt(body.categoryId)
    console.log(body)
    const result = await models.Posts.update(
        body, {
        where: {
            id: req.params.id
        }
    })
    if (result) {
        res.status(200).json({ msg: `Post by id ${req.params.id} is update` })
    } else {
        res.status(400).json({ msg: `Post by id ${req.params.id} is not update` })
    }

    res.json()
}