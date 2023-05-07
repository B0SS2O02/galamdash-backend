const models = require('../../models')
const check = require('./check')

exports.list = async (req, res) => {
    try {
        if (check.variables(['id'], req, res, 'You are not logined')) {
            const drafts = await models.Drafts.findAll({
                where: {
                    creatorId: req.id
                },
                attributes: ['id', 'title', 'content', 'img', 'info', ['updatedAt', 'time']]
            })
            res.json(drafts)
        }
    } catch (error) {
        console.log(error)
    }
}

exports.view = async (req, res) => {
    try {
        if (check.variables(['id'], req, res, 'You are not logined')) {
            if (check.variables(['id'], req.params, res)) {
                const drafts = await models.Drafts.findOne({
                    where: {
                        id: req.params.id,
                        creatorId: req.id
                    },
                    attributes: ['id', 'title', 'content', 'img', 'info', ['updatedAt', 'time']]
                })
                res.json(drafts)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.create = async (req, res) => {
    try {
        if (check.variables(['id'], req, res, 'You are not logined')) {
            if (check.variables(['file'], req, res, 'Image not define')) {
                if (check.variables(['content', 'info', 'title'], req.body, res)) {
                    req.body.CategoryId = parseInt(req.body.category)
                    req.body.creatorId = req.id
                    req.body.img = req.file.path
                    const draft = await models.Drafts.create(
                        req.body
                    )
                    if (!draft) {
                        res.status(500).json({
                            msg: 'Draft is not create'
                        })
                    } else {
                        res.json({
                            msg: `Draft id is : ${draft.id}`
                        })
                    }

                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.edit = async (req, res) => {
    try {
        if (check.variables(['id'], req, res, 'You are not logined')) {
            if (check.variables(['id'], req.params, res)) {
                let body = req.body
                if (!!req.file) {
                    body.img = req.file.path
                }
                const oldDraft = await models.Drafts.findOne({
                    where: {
                        id: req.params.id,
                        creatorId: req.id
                    }
                })
                if (!oldDraft) {
                    res.json(404).json({ msg: 'Draft not define' })
                } else {
                    const draft = await models.Drafts.update(
                        body, {
                        where: {
                            id: req.params.id
                        }
                    }
                    )
                    if(draft){
                        res.json('Draft is update')
                    }else{
                        res.status(400).json('Draft is not update')
                    }
                }

            }
        }
    } catch (error) {
        console.log(error)
    }

}