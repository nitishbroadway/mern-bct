const { Router } = require('express')
const FrontCtrl = require('../controllers/front/front.controller.js')

const router = Router()

router.get('/articles', FrontCtrl.articles)

router.get('/articles/:id', FrontCtrl.articleById)

router.get('/articles/:id/comments', FrontCtrl.commentsByArticleId)

router.post('/articles/:id/comments', FrontCtrl.commentCreate)

router.get('/categories', FrontCtrl.categories)

router.get('/categories/:id', FrontCtrl.categoryById)

router.get('/categories/:id/articles', FrontCtrl.articleByCategoryId)

router.get('/image/:filename', (req, res, next) => 
    res.sendFile(`./uploads/${req.params.filename}`, {
        root: './'
    }))

module.exports = router