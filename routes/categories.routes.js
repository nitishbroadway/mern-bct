const { Router } = require('express')
const CategoriesCtrl = require('../controllers/cms/categories.controller.js')

const router = Router()

router.get('/', CategoriesCtrl.index)
router.post('/', CategoriesCtrl.store)
router.get('/:id', CategoriesCtrl.show)
router.put('/:id', CategoriesCtrl.update)
router.patch('/:id', CategoriesCtrl.update)
router.delete('/:id', CategoriesCtrl.destroy)

module.exports = router