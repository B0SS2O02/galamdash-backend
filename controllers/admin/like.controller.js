const models = require('../../models')

exports.list = async (req, res, next) => {
    try {
        if (!req.body.filter) {
            res.status(400).json({
                msg: "Filter field is empty"
            })
            next()
        } else {
            if (!(req.body.filter == 'post' || req.body.filter == 'user')) {
                res.status(400).json({
                    msg: 'Filter value is not define'
                })
                next()
            }
        }
        if (!req.body.id) {
            res.status(400).json({
                msg: "Id field is empty"
            })
            next()
        }
        const Count = req.body.count || false
        let page = req.query.page - 1 || 0
        const count = 10
        let category
        let where = {}
        where[req.body.filter + 'Id'] = req.body.id
        if (Count) {
            category = await models.Likes.findAll({
                where: where,
                attributes: [[models.Sequelize.fn('COUNT', models.Sequelize.col('id')), 'count']]
            })
            category=category[0]    
        } else {
            category = await models.Likes.findAll({
                where: where,
                offset: page * count,
                limit: count,
                attributes: ['id', 'postId', 'userId', ['createdAt', 'time']]
            })
           
        }

        res.status(200).json({ date: category })
    } catch (error) {
        console.error(error)
    }
}

exports.view = async (req, res, next) => {
    try {
        if (!req.body.post) {
            res.status(400).json({
                msg: "Post id not define"
            })
        }
        if (!req.body.user) {
            res.status(400).json({
                msg: "User id not define"
            })
        }

        res.status(200).json(data)
    } catch (error) {
        console.error(error)
    }
}
