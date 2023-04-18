const models = require('../../models')
const jwt = require('jsonwebtoken')




exports.list = async (req, res, next) => {
    try {
        let page = req.query.page - 1 || 0
        let sort = req.query.sort || 'id,ASC'
        const count = 10
        const CatCount = await models.Categories.findAll({
            attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']]
        })
        const category = await models.Categories.findAll({
            attributes: ['id', 'title'],
            order: [[sort.split(',')[0], sort.split(',')[1]]],
            offset: page * count,
            limit: count
        })
        if (!category) {
            res.status(400).json({ msg: 'Categories not define' })
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
            next()
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }

}

exports.edit = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).json({
                msg: 'Id parametr is empty'
            })
            next()
        }
        if (!req.body.title) {
            res.status(400).json({
                msg: 'Title input is empty'
            })
            next()
        }
        const category = await models.Categories.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!category) {
            res.status(400).json({
                msg: "User undefined"
            })
            next()
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
    } catch (error) {
        console.error(error)
    }

}

exports.delete = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).json({
                msg: 'Id parametr is empty'
            })
            next()
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
            next()
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
    } catch (error) {
        console.error(error)
    }

}

exports.create = async (req, res, next) => {
    try {
        if (!req.body.title) {
            res.status(400).json({
                msg: 'Title input is empty'
            })
            next()
        } else {
            const result = await models.Categories.create({
                title: req.body.title
            })
            res.status(200).json({ msg: "Category is create" })
        }
    } catch (error) {
        console.error(error)
    }

}

exports.search = async (req, res, next) => {
    try {
        if (!req.query.word) {
            res.status(400).json({
                msg: 'Search paramet is empty'
            })
            next()
        } else if (!req.query.filter) {
            res.status(400).json({
                msg: 'Filter paramet is empty'
            })
            next()
        } else {
            let page = req.query.page - 1 || 0
            const count = 10
            let where = {}
            if (req.query.filter == 'id') {
                if (!parseInt(req.query.word)) {
                    res.status(400).json({ msg: 'Id parametr is empty' })
                    next()
                } else {
                    where[req.query.filter] = parseInt(req.query.word)
                }
            } else {
                where[req.query.filter] = {
                    [models.Sequelize.Op.like]: `${req.query.word}%`
                }
            }
            const CategoryCount = await models.Categories.findAll({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: where,
            })


            const Category = await models.Categories.findAll({
                attributes: ['id', 'title'],
                where: where,
                offset: page * count,
                limit: count
            })
            res.status(200).json({
                page: page + 1,
                pages: Math.ceil(parseInt(CategoryCount[0].get('count')) / 10),
                description: 'All categoies list',
                data: Category
            })
        }
    } catch (error) {
        console.error(error)
    }
}