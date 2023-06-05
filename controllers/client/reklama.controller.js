const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    try {

        if (req.params.position == ',' || !req.params.position) {
            req.params.position = 1
        }
        const Reklama = await models.Reklama.findAll({
            where: {
                position: req.params.position
            },
            attributes: ['id', 'link', 'img', 'title']
        })
        res.json(Reklama)


    } catch (error) {
        console.log(error)
    }
}