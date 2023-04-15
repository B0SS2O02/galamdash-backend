const models = require('../../models')
const jwt = require('jsonwebtoken')

exports.list = async (req, res) => {
    let page = req.query.page - 1 || 0
    const count = 10
    const category = await models.Likes.findAll({
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
    const user = await models.Likes.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!user) {
        res.status(400).json({
            msg: "Like undefine"
        })
    }
    res.status(200).json(user)
}
