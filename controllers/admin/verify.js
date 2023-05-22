const models = require('../../models')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    if (!!req.headers.authorization) {
        const token = req.headers.authorization
        try {
            const { user_id, type } = jwt.verify(token, process.env.TOKEN_KEY)
            if (parseInt(type) < 3) {
                res.status(502).json({
                    msg: "You are not admin"
                })
            } else {
                let user = await models.Users.findOne({
                    where: {
                        id: user_id
                    }
                })
                if (!user) {
                    res.status(503).json({
                        msg: 'You user undefine'
                    })
                } else if (user.ban) {
                    res.status(403).json({
                        msg: 'You are baned'
                    })
                } else if (user.type < 3) {
                    res.status(503).json({ msg: 'You are not admin' })
                } else {
                    req.id = user_id
                    req.type = type
                    next()
                }

            }
        } catch (error) {
            res.status(503).json({ msg: "Your token has expired" })
        }


    } else {
        res.status(400).json({
            msg: "Token is not"
        })
    }
}