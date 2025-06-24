const {Router} = require('express')
const authRoutes = require('./auth.routes.js')
const profileRoutes = require('./profile.routes.js')
const authorsRoutes = require('./authors.routes.js')
const categoriesRoutes = require('./categories.routes.js')
const articlesRoutes = require('./articles.routes.js')
const commentsRoutes = require('./comments.routes.js')
const frontRoutes = require('./front.routes.js')
const { auth, adminOnly } = require('../library/middlewares.js')

const router = Router()

router.use("/auth", authRoutes)

router.use("/profile", auth, profileRoutes)

router.use("/cms/authors", auth, adminOnly, authorsRoutes)

router.use("/cms/categories", auth, categoriesRoutes)

router.use("/cms/articles", auth, articlesRoutes)

router.use("/cms/comments", auth, commentsRoutes)

router.use(frontRoutes)

module.exports = router