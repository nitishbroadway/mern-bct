const { Router } = require('express')
const AuthorsCtrl = require('../controllers/cms/authors.controller.js')

const router = Router()

router.get('/', AuthorsCtrl.index)
router.post('/', AuthorsCtrl.store)
router.get('/:id', AuthorsCtrl.show)
router.put('/:id', AuthorsCtrl.update)
router.patch('/:id', AuthorsCtrl.update)
router.delete('/:id', AuthorsCtrl.destroy)

module.exports = router