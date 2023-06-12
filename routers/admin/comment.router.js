const router = require('express').Router()
const Comment = require('../../controllers/admin/comment.controller')
const verify = require('../../controllers/admin/verify')
const { param, body, query } = require('express-validator')

router.use(verify);

router.get('/', Comment.list)

router.get('/view/:id', param('id').notEmpty(), Comment.view)

router.put('/:id', param('id').notEmpty(), body('content').notEmpty(), Comment.edit)

router.delete('/:id', param('id'), Comment.delete)

router.get('/search', query('word').notEmpty(), query('filter').notEmpty(), Comment.search)


module.exports = router