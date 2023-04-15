const models = require('../../models')
const jwt = require('jsonwebtoken')




exports.list = async (req, res) => {
    let page = req.query.page - 1 || 0
    const count = 10
    const CatCount = await models.Categories.findAll({
        attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']]
    })
    const category = await models.Categories.findAll({
        offset: page * count,
        limit: count
    })
    res.status(200).json({
        page: page + 1,
        pages: Math.ceil(parseInt(CatCount[0].get('count')) / 10),
        description: 'All categoies list',
        data: category
    })

}

exports.view = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
    }
    const user = await models.Categories.findOne({
        attributes: ['id', 'title', ['createdAt', 'time']],
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

exports.edit = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
    }
    if (!req.body.title) {
        res.status(400).json({
            msg: 'Title input is empty'
        })
    }
    const category = await models.Categories.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!category) {
        res.status(400).json({
            msg: "User undefine"
        })
    } else {
        const result = await models.Categories.update({
            title: req.body.title
        }, {
            where: {
                id: req.params.id
            }
        })
        if (result) {
            res.status(200).json({ msg: `Category by id ${req.params.id} is update` })
        } else {
            res.status(400).json({ msg: `Category by id ${req.params.id} is not update` })
        }
    }
}

exports.delete = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
    }
    const category = await models.Categories.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!category) {
        res.status(400).json({
            msg: "User undefine"
        })
    } else {
        const result = await models.Categories.destroy({
            where: {
                id: req.params.id
            }
        })
        if (result) {
            res.status(200).json({ msg: `Category by id ${req.params.id} is deleted` })
        } else {
            res.status(400).json({ msg: `Category by id ${req.params.id} is not deleted` })
        }
    }
}

exports.create = async (req, res) => {
    if (!req.body.title) {
        res.status(400).json({
            msg: 'Title input is empty'
        })
    } else {
        const result = await models.Categories.create({
            title: req.body.title
        })
        res.status(200).json({ msg: "Category is create" })
    }
}
