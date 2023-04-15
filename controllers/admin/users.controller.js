const models = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.list = async (req, res) => {
    let page = req.query.page - 1 || 0
    const count = 10
    const UserCount = await models.Users.findAll({
        attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']]
    })
    const Users = await models.Users.findAll({
        attributes: ['id', 'nick', "name", "surname", "img", "type", "ban"],
        offset: page * count,
        limit: count
    })
    res.status(200).json({
        page: page + 1,
        pages: Math.ceil(parseInt(UserCount[0].get('count')) / 10),
        description: 'All categoies list',
        data: Users
    })

}

exports.view = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
    }
    const user = await models.Users.findOne({
        attributes: ['id', 'nick', "name", "surname", "img", "info", "ball", "email", "type", "ban", ["createdAt", "time"]],
        where: {
            id: req.params.id
        }
    })
    if (!user) {
        res.status(400).json({
            msg: "User undefine"
        })
    }
    res.status(200).json(user)
}

exports.ban = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
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
}

exports.type = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
    }
    if (!req.body.type) {
        res.status(400).json({
            msg: 'Type area in body is empty'
        })
    }
    let resu = await models.Users.update({
        type: req.body.type
    }, {
        where: {
            id: req.params.id
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

}



exports.search = async (req, res) => {
    if (!req.query.search) {
        res.status(400).json({
            msg: 'Search paramet is empty'
        })
    } else {
        let page = req.query.page - 1 || 0
        const count = 10
        const UserCount = await models.Users.findAll({
            attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
            where: {
                name: {
                    [Op.like]: `%${req.body.search}`
                }
            },
        })
        const Users = await models.Users.findAll({
            attributes: ['id', 'nick', "name", "surname", "img", "type", "ban"],
            where: {
                name: {
                    [Op.like]: `%${req.body.search}`
                }
            },
            offset: page * count,
            limit: count
        })
        res.status(200).json({
            page: page + 1,
            pages: Math.ceil(parseInt(UserCount[0].get('count')) / 10),
            description: 'All categoies list',
            data: Users
        })
    }
}
