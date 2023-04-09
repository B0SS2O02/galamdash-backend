const models = require('../../models')
const jwt = require('jsonwebtoken')

exports.verify = (req, res, next) => {
    if (!req.headers.authorization === false) {
        if (req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1]
            const { user_id, type } = jwt.verify(token, process.env.TOKEN_KEY)
            if (parseInt(type) < 2) {
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
    const category = await models.Categories.findAll({
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
    }
    const result = await models.Categories.create({
        title: req.body.title
    })
    res.status(200).json({ msg: "Category is create" })
}