const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    try {
        const GreatWords = await models.Greatwords.findAll({
            attributes: ['id', 'content', 'avtor']
        })
        check.send(GreatWords, res)
    } catch (error) {
        console.log(error)
    }
}