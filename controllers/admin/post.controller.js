const models = require('../../models')
const fs = require('fs')
const check = require('../client/check')

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
            }, {
                model: models.Tags,
                attributes: ['id'],
                include: {
                    model: models.TagLists,
                    attributes: ['id', 'title']
                }
            }],
            attributes: ['id', 'title', 'content', 'img', 'info', 'ball', 'ban', ['createdAt', 'time']],
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
    try {
        if (check.variables(['id'], req.params, res)) {
            const post = await models.Posts.findOne({
                include: [{
                    model: models.Tags,
                    attributes: ['id'],
                    include: {
                        model: models.TagLists,
                        attributes: ['id', 'title']
                    }
                }],
                where: {
                    id: req.params.id
                }
            })
            if (!post) {
                res.status(404).json({
                    msg: `Post by id ${req.params.id} is not define`
                })
            } else {
                let body = req.body
                if (!!req.file) {
                    if (post.img !== "public/images/default_avatar.jpg") {
                        fs.unlink(post.img, (err) => {
                            if (err) return console.log(err)
                        });
                    }
                    body.img = req.file.path
                }

                const old = post.Tags
                let New = []
                if (req.body.Tags.length == 0) {
                    req.body.Tags = []
                } else {
                    req.body.Tags = req.body.Tags.split(',')
                }

                console.log(req.body.Tags)
                for (let i = 0; i < req.body.Tags.length; i++) {
                    New.push({
                        id: req.body.Tags[i],
                        count: 0
                    })
                }
                let result = {
                    add: [],
                    del: []
                }
                for (let i = 0; i < old.length; i++) {
                    let count = 0
                    for (let j = 0; j < New.length; j++) {
                        const element = New[j];

                        if (element.id == old[i].TagList.id) {
                            count++
                        } else {
                            console.log(element)
                            New[j]['count'] = New[j].count + 1
                        }
                    }
                    console.log(count)
                    if (count == 0) {
                        console.log(old[i])
                        result['del'].push(old[i].TagList.id)
                    }
                }
                for (let i = 0; i < New.length; i++) {
                    const element = New[i];
                    if (element.count == old.length) {
                        result['add'].push(element.id)
                    }

                }
                console.log(result)
                // delete
                for (let i = 0; i < result.del.length; i++) {
                    await models.Tags.destroy({
                        where: {
                            post: req.params.id,
                            tag: result.del[i]
                        }
                    })
                }
                // add
                for (let i = 0; i < result.add.length; i++) {
                    await models.Tags.create({
                        post: req.params.id,
                        tag: result.add[i]
                    })
                }


                if (body.ban == 'true') {
                    body.ban = true
                } else {
                    body.ban = false
                }
                body.CategoryId = parseInt(body.categoryId)
                const result1 = await models.Posts.update(
                    body, {
                    where: {
                        id: req.params.id
                    }
                })
                if (result1) {
                    res.status(200).json({ msg: `Post by id ${req.params.id} is update` })
                } else {
                    res.status(400).json({ msg: `Post by id ${req.params.id} is not update` })
                }
            }

        }
    } catch (error) {
        console.log(error)
    }



}