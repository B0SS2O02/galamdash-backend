const models = require("../../models")
const check = require("../client/check")



exports.list = async (req, res) => {
    try {
        let page = req.query.page - 1 || 0
        let count = req.query.count || 10
        let sort = req.query.sort || 'id,ASC'
        let where = {}
        if (!!req.query.word || !!req.query.filter) {
            if (req.query.filter == 'id') {
                where[req.query.filter] = req.query.word
            } else {
                where[req.query.filter] = { [models.Sequelize.Op.like]: `${req.query.word}%` }
            }
        }
        const GreatWords = await models.Greatwords.findAll({
            where: where,
            order: [[sort.split(',')[0], sort.split(',')[1]]],
            attributes: ['id', 'content', 'avtor'],
            offset: page * count,
            limit: count
        })
        if (!GreatWords) {
            res.status(404).json({
                msg: 'Great words not define'
            })
        } else {
            const Count = await models.Greatwords.findAll({
                where: where,
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']]
            })
            res.json({
                page: page + 1,
                pages: Math.ceil(parseInt(Count[0].get('count')) / 10),
                data: GreatWords
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.view = async (req, res) => {
    try {
        if (check.variables(['id'], req.params, res)) {
            const greatwords = await models.Greatwords.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'content', 'avtor'],
            })
            check.send(greatwords, res, 'Great words not define')
        }
    } catch (error) {
        console.log(error)
    }
}

exports.add = async (req, res) => {
    try {
        if (check.variables(['content', 'avtor'], req.body, res)) {
            const greatwords = await models.Greatwords.create(req.body)
            if (!greatwords) {
                res.status(500).json({ msg: 'Great words not create' })
            } else {
                res.json({ msg: 'GreatWords create' })
            }
        }
    } catch (error) {
        console.log(error)
    }
}
exports.edit = async (req, res) => {
    try {
        let old = await models.Greatwords.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!old) {
            res.status(404).json('Great words not define')
        } else {
            console.log(req.body)
            const greatwords = await models.Greatwords.update(
                req.body, {
                where: {
                    id: req.params.id
                }
            })
            if (!greatwords) {
                res.status(500).json({ msg: 'Great words not edited' })
            } else {
                res.json({ msg: 'GreatWords edited' })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.del = async (req, res) => {
    try {
        if (check.variables(['id'], req.params), res) {
            let old = await models.Greatwords.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!old) {
                res.status(404).json({ msg: 'Great words not define' })
            } else {
                await models.Greatwords.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    res.json({ msg: `GreatWords by ID ${old.id} is deleted` })
                }).catch((err) => {
                    res.status(500).json({ msg: `GreatWords by ID ${old.id} is not deleted` })
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}