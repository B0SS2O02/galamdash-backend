const models = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.verify = (req, res, next) => {
    if (!req.headers.authorization === false) {
        if (req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1]
            const { user_id, type } = jwt.verify(token, process.env.TOKEN_KEY)
            if (parseInt(type) < 3) {
                res.status(502).json({
                    msg: "You are not admin"
                })
            } else {
                let user = models.Users.findOne({
                    where: {
                        id: user_id
                    }
                })
                if (!user) {
                    res.status(503).json({
                        msg: 'You user undefine'
                    })
                }
                if (user.ban) {
                    res.status(503).json({
                        msg: 'You are baned'
                    })
                }
                req.id = user_id
                req.type = type
                next()
            }

        } else {
            res.status(502).json({
                msg: "You are not admin "
            })
        }
    } else {
        res.status(502).json({
            msg: "You are not admin "
        })
    }

}


exports.list = async (req, res) => {
    let page = req.query.page - 1 || 0
    const count = 10
    const users = await models.Users.findAll({
        offset: page * count,
        limit: count
    })
    res.status(200).json({ date: users })
}

exports.view = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
    }
    const user = await models.Users.findOne({
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
