const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    if (check.variables(['id'], req, res, 'You are not logineв')) {
        const view = await models.Views.findAll({
            where: {
                user: req.id
            },
            attributes: ['id', ['updatedAt', 'time']],
            include: {
                model: models.Posts,
                attributes: ['id', 'title', 'content', 'img']
            }
        })
        check.send(view, res)
    }
}