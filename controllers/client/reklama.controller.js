const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    try {
        if (check.variables(['position'], req.params)) {
            const Reklama = await models.Reklama.findAll({
                where: {
                    position: req.params.position
                },
                attributes: ['id', 'link', 'img']
            })
            res.json(Reklama)
        }

    } catch (error) {
        console.log(error)
    }
}