const models = require('../../models')


exports.list = async (req, res) => {
    let page = req.query.page - 1 || 0
    const count = 10
    const category = await models.Categories.findAll({
        attributes: ['id', 'title'],
        offset: page * count,
        limit: count
    })
    res.status(200).json({ date: category })
}

exports.view = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
    }
    const user = await models.Categories.findOne({
        attributes: ['id', 'title'],
        include: [{
            model: models.Posts,
            attributes: ['id', 'img', 'title','info']
        }],
        where: {
            id: req.params.id
        }

    })
    if (!user) {
        res.status(400).json({
            msg: "Category undefine"
        })
    }
    res.status(200).json(user)
}