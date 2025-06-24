const { Router } = require('express')
const ArticlesCtrl = require('../controllers/cms/articles.controller.js')
const { upload } = require('../library/middlewares.js')

const router = Router()

router.get('/', ArticlesCtrl.index)
router.post('/', upload().single('image'), ArticlesCtrl.store)
router.get('/:id', ArticlesCtrl.show)
router.put('/:id', upload().single('image'), ArticlesCtrl.update)
router.patch('/:id', upload().single('image'), ArticlesCtrl.update)
router.delete('/:id', ArticlesCtrl.destroy)

module.exports = router