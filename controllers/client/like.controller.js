const models = require('../../models')
const jwt = require('jsonwebtoken')

exports.verify = (req, res, next) => {
    if (!req.headers.authorization === false) {
        if (req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1]
            const { user_id, type } = jwt.verify(token, process.env.TOKEN_KEY)
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
    }
}

exports.add = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: "Post id parametr is wrong"
        })
    }
    let post = await models.Posts.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!post) {
        res.status(404).json({
            msg: 'Post undefine'
        })
    }
    let dislike = true
    if (!req.body.dislike) {
        dislike = false
    }
    const result = await models.Likes.create({
        postId: req.params.id,
        userId: req.id,
        dislike: dislike
    })
    res.status(200).json({
        data: result
    })

}