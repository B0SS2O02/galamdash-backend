const jwt = require('jsonwebtoken')
const models = require('../../models')



exports.count = async (req, res) => {
    let body = [
        { title: 'user', color: 'info' }
    ]
    for (let i = 0; i < body.length; i++) {
        body[i]['count'] = await models.Users.count()
    }
    res.json(body)
}