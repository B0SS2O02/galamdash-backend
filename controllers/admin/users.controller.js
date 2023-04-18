const models = require('../../models')
const bcrypt = require('bcrypt')
const { parse } = require('dotenv')
const jwt = require('jsonwebtoken')
const { where } = require('sequelize')


exports.list = async (req, res, next) => {
    try {
        let page = req.query.page - 1 || 0
        let sort = req.query.sort || 'id,ASC'

        const count = 10
        const UserCount = await models.Users.findAll({
            attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']]
        })

        const Users = await models.Users.findAll({
            attributes: ['id', 'nick', "name", "surname", "img", ["type", "Utype"], "ban"],
            order: [[sort.split(',')[0], sort.split(',')[1]]],
            offset: page * count,
            limit: count
        })
        res.status(200).json({
            page: page + 1,
            pages: Math.ceil(parseInt(UserCount[0].get('count')) / 10),
            description: 'All categoies list',
            data: Users
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
        const user = await models.Users.findOne({
            attributes: ['id', 'nick', "name", "surname", "img", "info", "ball", "email", ["type", "Utype"], "ban", ["createdAt", "time"]],
            where: {
                id: req.params.id
            }
        })
        if (!user) {
            res.status(400).json({
                msg: "User undefine"
            })
            next()
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
}

exports.ban = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).json({
                msg: 'Id parametr is empty'
            })
            next()
        }
        const user = await models.Users.findOne({
            attributes: ['ban'],
            where: {
                id: req.params.id
            }
        })
        await models.Users.update({
            ban: !user.ban
        }, {
            where: {
                id: req.params.id
            }
        });
        let msg
        if (!user.ban == false) {
            msg = `User by id ${req.params.id} is not baned`
        } else {
            msg = `User by id ${req.params.id} is baned`
        }
        res.status(200).json({
            msg: msg
        })
    } catch (error) {
        console.error(error)
    }
}

exports.type = async (req, res, next) => {
    try {
        console.log(req.params, req.body)
        if (!req.params.id) {
            res.status(400).json({
                msg: 'Id parametr is empty'
            })
            next()
        }
        if (!req.body.type && req.body.type != 0) {
            res.status(400).json({
                msg: 'Type area in body is empty'
            })
            next()
        }
        let resu = await models.Users.update({
            type: req.body.type
        }, {
            where: {
                id: parseInt(req.params.id)
            }
        });
        if (resu) {
            res.status(200).json({
                msg: `User by id ${req.params.id} is edit`
            })

        } else {
            res.status(404).json({
                msg: `User by id ${req.params.id} is not edit`
            })
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

            const UserCount = await models.Users.findAll({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: where,
            })


            const Users = await models.Users.findAll({
                attributes: ['id', 'nick', "name", "surname", "img", "type", "ban"],
                where: where,
                offset: page * count,
                limit: count
            })
            console.log(Users)
            res.status(200).json({
                page: page + 1,
                pages: Math.ceil(parseInt(UserCount[0].get('count')) / 10),
                description: 'All categoies list',
                data: Users
            })
        }
    } catch (error) {
        console.error(error)
    }
}
