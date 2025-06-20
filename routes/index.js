const {Router} = require('express')
const authRoutes = require('./auth.routes.js')
const profileRoutes = require('./profile.routes.js')
const authorsRoutes = require('./authors.routes.js')
const { auth, adminOnly } = require('../library/middlewares.js')

const router = Router()

router.use("/auth", authRoutes)

router.use("/profile", auth, profileRoutes)

router.use("/cms/authors", auth, adminOnly, authorsRoutes)

module.exports = router