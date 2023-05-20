const models = require('../../models')
const check = require('./check')
exports.view = async (req, res) => {
    try {
        if (check.variables(['id'], req.params, res)) {
            const page = req.params.page - 1 || 0
            const count = req.params.count || 10
            const Tag = await models.Tags.findAll({
                attributes: ['id'],
                include: [{
                    model: models.Posts,
                    attributes: ['id', 'title', 'img', 'info']
                }],
                where: {
                    tag: req.params.id,
                },
                offset: page * count,
                limit: count

            })
            if (!Tag) {
                res.status(400).json({
                    msg: "Tag undefine"
                })
            }
            res.status(200).json(Tag)
        }
    } catch (error) {
        console.log(error)
    }
}
exports.list = async (req, res) => {
    try {
        const all = req.query.all || false
        const page = req.params.page - 1 || 0
        const count = req.params.count || 10
        let content = {
            attributes: ['id', 'title'],
            offset: page * count,
            limit: count
        }
        if (all) {
            content = {
                attributes: ['id', 'title'],
            }
        }
        const Tags = await models.TagLists.findAll(content)
        res.json(Tags)
    } catch (error) {
        console.log(error)
    }
}