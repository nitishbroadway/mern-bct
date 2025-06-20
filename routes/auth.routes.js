const {Router} = require('express')
const RegisterCtrl = require('../controllers/auth/register.controller.js')
const LoginCtrl = require('../controllers/auth/login.controller.js')

const router = Router()

router.post('/register', RegisterCtrl.register)

router.post('/login', LoginCtrl.login)

module.exports = router