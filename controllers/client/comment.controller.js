const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    check.variables(['id'], req.params, res)
    const com = await models.Comments.findAll({
        attributes: ['id', 'user', 'content', 'parent', ['createdAt', 'time']],
        where: {
            post: req.params.id
        }
    })
    let comments = []
    for (let i = 0; i < com.length; i++) {
        if (!c.parent) {
            comments.push({
                id: c.id,
                user: c.user,
                content: c.content,
                time: c.time,
                comments: []
            })
        } else {
            for (let j = 0; j < comments.length; j++) {
                let c2 = comments[j]
                if (c.parent === c2.id) {
                    comments[j]['comments'].push({
                        id: c.id,
                        user: c.user,
                        content: c.content,
                        time: c.time,
                    })
                }
            }
        }
    }
    res.json(comments)
}

exports.add = async (req, res) => {
    try {
        check.variables(['post', 'content'], req.body, res)
        check.variables(['id'], req, res, 'You are logined')
        let body = {
            post: req.body.post,
            content: req.body.content
        }
        if (!!req.body.parent) {
            body['parent'] = req.body.parent
        }
        await models.Comments.create(body).catch((err) => {
            console.log(err)
            res.status(400).json(err)
        }).then((result) => { res.json(result) })
    } catch (error) {
        console.log(error)
    }

}