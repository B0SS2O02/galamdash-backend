const models = require("../../models")
const check = require("../client/check")
const fs = require('fs')



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
        const Reklama = await models.Reklama.findAll({
            where: where,
            order: [[sort.split(',')[0], sort.split(',')[1]]],
            attributes: ['id', 'img', 'link', 'title', 'position'],
            offset: page * count,
            limit: count
        })
        if (!Reklama) {
            res.status(404).json({
                msg: 'Reklama not define'
            })
        } else {
            const Count = await models.Reklama.findAll({
                where: where,
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']]
            })
            res.json({
                page: page + 1,
                pages: Math.ceil(parseInt(Count[0].get('count')) / 10),
                data: Reklama
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.view = async (req, res) => {
    try {
        if (check.variables(['id'], req.params, res)) {
            const reklama = await models.Reklama.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'img', 'link', 'title', 'position'],
            })
            check.send(reklama, res, 'Reklama not define')
        }
    } catch (error) {
        console.log(error)
    }
}

exports.add = async (req, res) => {
    try {
        if (check.variables(['link', 'position', 'title'], req.body, res)) {
            if (check.variables(['file'], req, res, 'Image not define')) {
                req.body.img = req.file.path
                const reklama = await models.Reklama.create(req.body)
                if (!reklama) {
                    res.status(500).json({ msg: 'Reklama not create' })
                } else {
                    res.json({ msg: 'Reklama create' })
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}
exports.edit = async (req, res) => {
    try {
        let old = await models.Reklama.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!old) {
            res.status(404).json('Reklama not define')
        } else {
            if (!!req.file) {
                console.log(req.file)
                req.body.img = req.file.path
                if (old.img !== "public/images/default_avatar.jpg") {
                    fs.unlink(old.img, (err) => {
                        if (err) return console.log(err)
                    });
                }
            }
            const reklama = await models.Reklama.update(
                req.body, {
                where: {
                    id: req.params.id
                }
            })
            if (!reklama) {
                res.status(500).json({ msg: 'Reklama not edited' })
            } else {
                res.json({ msg: 'Reklama edited' })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.del = async (req, res) => {
    try {
        if (check.variables(['id'], req.params), res) {
            let old = await models.Reklama.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!old) {
                res.status(404).json({ msg: 'Reklama not define' })
            } else {
                await models.Reklama.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    if (old.img !== "public/images/default_avatar.jpg") {
                        fs.unlink(old.img, (err) => {
                            if (err) return console.log(err)
                        });
                    }
                    res.json({ msg: `Reklama by ID ${old.id} is deleted` })
                }).catch((err) => {
                    res.status(500).json({ msg: `Reklama by ID ${old.id} is not deleted` })
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}