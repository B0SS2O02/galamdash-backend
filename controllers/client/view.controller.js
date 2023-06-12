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
                attributes: ['id', 'title', 'img', 'content', 'info', ['createdAt', 'time']],
                include: [{
                    model: models.Tags,
                    attributes: ['id'],
                    include: {
                        model: models.TagLists,
                        attributes: ['id', 'title']
                    }
                }, {
                    model: models.Users,
                    attributes: ['id', 'nick', 'email', 'img']
                }],
            }
        })
        let View = []
        console.log(req.id, view)
        for (let i = 0; i < view.length; i++) {
            View.push(view[i].Post)
        }

        check.send(View, res)
    }
}