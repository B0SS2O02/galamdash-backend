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
