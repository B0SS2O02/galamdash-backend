const models = require('../../models')

exports.list = async (req, res, next) => {
    try {
        let page = req.query.page - 1 || 0
        let sort = req.query.sort || 'id,ASC'
        if (sort.split(',')[0] == 'Post') {
            sort = 'post,' + sort.split(',')[1]
        }
        if (sort.split(',')[0] == 'User') {
            sort = 'user,' + sort.split(',')[1]
        }
        const count = 10
        const CommentCount = await models.Comments.findAll({
            attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']]
        })
        const Comments = await models.Comments.findAll({
            attributes: ['id', "content", ['createdAt', "time"]],
            include: [{
                model: models.Posts,
                attributes: ['id', 'title']
            }, {
                model: models.Users,
                attributes: ['id', 'nick', 'img']
            }],
            order: [[sort.split(',')[0], sort.split(',')[1]]],
            offset: page * count,
            limit: count
        })
        res.status(200).json({
            page: page + 1,
            pages: Math.ceil(parseInt(CommentCount[0].get('count')) / 10),
            description: 'All categoies list',
            data: Comments
        })
    } catch (error) {
        console.error(error)
    }
}

exports.view = async (req, res) => {
    try {
        const user = await models.Comments.findOne({
            attributes: ['id', 'content', ['createdAt', 'time']],
            include: [{
                model: models.Users,
                attributes: ['id', 'nick', 'img']
            }, {
                model: models.Posts,
                attributes: ['id', 'title', 'img']
            }],
            where: {
                id: req.params.id
            }
        })
        if (!user) {
            res.status(400).json({
                msg: "Category undefine"
            })
        } else {
            res.json(user)
        }

    } catch (error) {
        console.error(error)
    }

}

exports.edit = async (req, res) => {
    try {
        const category = await models.Comments.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!category) {
            res.status(400).json({
                msg: "Comment undefined"
            })
        } else {
            const result = await models.Comments.update(body, {
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
    } catch (error) {
        console.error(error)
    }

}

exports.delete = async (req, res, next) => {
    try {
        const comment = await models.Comments.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!comment) {
            res.status(400).json({
                msg: "Comment undefine"
            })
            next()
        } else {
            const result = await models.Comments.destroy({
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
    } catch (error) {
        console.error(error)
    }

}



exports.search = async (req, res, next) => {
    try {

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
        console.log(where)
        const CommentsCount = await models.Comments.findAll({
            attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
            where: where,
        })

        const Comment = await models.Comments.findAll({
            attributes: ['id', "content", ['createdAt', "time"]],
            include: [{
                model: models.Posts,
                attributes: ['id', 'title']
            }, {
                model: models.Users,
                attributes: ['id', 'nick', 'img']
            }],
            where: where,
            offset: page * count,
            limit: count
        })
        res.status(200).json({
            page: page + 1,
            pages: Math.ceil(parseInt(CommentsCount[0].get('count')) / 10),
            description: 'All categoies list',
            data: Comment
        })

    } catch (error) {
        console.error(error)
    }
}