const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    try {
        const page = req.query.page - 1 || 0
        const count = req.query.count || 10
        const category = await models.Categories.findAll({
            attributes: ['id', 'title'],
            offset: page * count,
            limit: count
        })
        check.send(category, res)
    } catch (error) {
        console.log(error)
    }

}

exports.view = async (req, res) => {
    try {
        const user = await models.Categories.findOne({
            attributes: ['id', 'title'],
            include: [{
                model: models.Posts,
                attributes: ['id', 'img','content', 'title', 'info', ['createdAt', 'time']],
                include:[{
                    model:models.Tags,
                },{
                    model:models.Users, 
                    attributes:['id','nick','email','img']
                }]
            }],
            where: {
                id: req.params.id
            }

        })
        check.send(user, res)

    } catch (error) {
        console.error(error)
    }

}