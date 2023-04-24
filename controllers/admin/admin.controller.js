const jwt = require('jsonwebtoken')
const models = require('../../models')



exports.count = async (req, res) => {
    let body = [
        { title: 'user', color: 'info', model: 'Users' },
        { title: 'post', color: 'warning', model: "Posts" }
    ]
    for (let i = 0; i < body.length; i++) {
        body[i]['count'] = await models[body[i].model].count()
    }
    res.json(body)
}