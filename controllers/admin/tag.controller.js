const models = require("../../models")
const check = require("../client/check")


exports.add = async (req, res) => {
    if (check.variables(['tag'], req.body, res)) {
        const tag = await models.TagLists.create({
            title: req.body.tag
        })
        res.json({ msg: `Tag created by ${tag.id}'` })
    }
}

exports.del = async (req, res) => {
    if (check.variables(['id', req.params, res])) {
        const old = await models.TagLists.findOne({
            where: {
                id: req.body.id
            }
        })
        if (!!old) {
            const tag = await models.TagLists.destroy({
                id: req.body.id
            })
            res.json({ msg: `Tag created by ${tag.id}` })
        } else {
            res.json({ msg: `Tag  by ${tag.id} not define` })
        }

    }
}