const models = require('../../models')

exports.list = async (req, res) => {
    let page = req.query.page - 1 || 0
    let sort = req.query.sort || 'id,ASC'
    const count = 10
    const CatCount = await models.Unconfirmed.findAll({
        attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']]
    })
    const Unconfirmed = await models.Unconfirmed.findAll({
        order: [[sort.split(',')[0], sort.split(',')[1]]],
        attributes: ['id', 'title', 'img'],
        include: [{
            model: models.Categories,
            attributes: ['id', 'title']
        }, {
            model: models.Users,
            attributes: ['id', 'nick', 'img']
        }],
        offset: page * count,
        limit: count
    })
    if (!Unconfirmed) {
        res.status(404).json({
            msg: 'Unconfirmeds is not define'
        })
    } else {
        res.status(200).json({
            page: page + 1,
            pages: Math.ceil(parseInt(CatCount[0].get('count')) / 10),
            description: 'All unconfirmed list',
            data: Unconfirmed
        })
    }
}

exports.view = async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({
            msg: 'Id parametr is empty'
        })
        next()
    }
    const Unconfirmed = await models.Unconfirmed.findOne({
        include: [{
            model: models.Categories,
            attributes: ['id', 'title']
        }, {
            model: models.Users,
            attributes: ['id', 'nick', 'img']
        }],
        attributes: ['id', 'title', 'content', 'img', 'info', ['createdAt', 'time']],
        where: {
            id: req.params.id
        }
    })
    if (!Unconfirmed) {
        res.status(404).json({ msg: `Unconfirmed by id ${req.params.id} not define` })
        next()
    }
    res.json(Unconfirmed)
    next()
}

exports.confirm = async (req, res, next) => {
    try {


        if (!req.body.choice || !req.body.id) {
            res.status(400).json({ msg: 'Element of body is empty' })
            next()
        }
        const Unconfirmed = await models.Unconfirmed.findOne({
            where: {
                id: req.body.id
            }
        })
        if (!Unconfirmed) {
            res.status(404).json({
                msg: `Unconfirmed by id ${req.body.id} not define`
            })
            next()
        }
        let Post = {}
        if (req.body.choice == 'a') {
            Post = await models.Posts.create({
                title: Unconfirmed.title,
                content: Unconfirmed.content,
                img: Unconfirmed.img,
                info: Unconfirmed.info,
                creatorId: Unconfirmed.creatorId,
                CategoryId: Unconfirmed.CategoryId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }

        const del = await models.Unconfirmed.destroy({
            where: {
                id: req.body.id
            }
        })

        res.json({ msg: ``, data: Post })

    } catch (error) {
        console.error(error)
    }
}