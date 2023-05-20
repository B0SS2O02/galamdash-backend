const models = require('../../models')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization || false
    if (token) {
        try {
            const { user_id, type } = jwt.verify(token, process.env.TOKEN_KEY)
            let user = await models.Users.findOne({
                where: {
                    id: user_id
                }
            })
            if (!user) {
                res.status(401).json({
                    msg: 'You user undefine'
                })
            } else if (user.ban) {
                res.status(401).json({
                    msg: 'You are baned'
                })
            }
            req.id = user_id
            req.type = type

        } catch (error) {
            res.status(401).json({ msg: "Your token has expired" })
        }
    }
    next()
}