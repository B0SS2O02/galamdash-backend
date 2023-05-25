const models = require('../../models')
const check = require('./check')


exports.count = async (req, res) => {
    try {
        if (check.variables(['id'], req.params, res)) {
            let body = {}
            const like = await models.Likes.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: req.params.id
                }
            })
            body['like'] = like
            const view = await models.Views.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: req.params.id
                }
            })
            body['view'] = view
            const comment = await models.Comments.findOne({
                attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'count']],
                where: {
                    post: req.params.id
                }
            })
            body['comment'] = comment
            res.json(body)
        }
    } catch (error) {
        console.log(error)
    }
}