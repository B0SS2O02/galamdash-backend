const models = require('../../models')


exports.list = async (req, res) => {
    let page = req.query.page - 1 || 0
    const count = 10
    const Posts = await models.Posts.findAll({
        attributes: ['id', 'title', 'img'],
        offset: page * count,
        limit: count
    })

    res.status(200).json({ data: Posts })
}

exports.view = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
    }
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
    if (!post) {
        res.status(400).json({
            msg: "Posts undefine"
        })
    }
    res.status(200).json(post)
}