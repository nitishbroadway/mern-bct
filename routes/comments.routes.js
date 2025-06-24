const { Router } = require('express')
const CommentsCtrl = require('../controllers/cms/comments.controller.js')

const router = Router()

router.get('/', CommentsCtrl.index)
router.delete('/:id', CommentsCtrl.destroy)

module.exports = router