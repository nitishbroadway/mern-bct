const {Router} = require('express')
const RegisterCtrl = require('../controllers/auth/register.controller.js')

const router = Router()

router.post('/auth/register', RegisterCtrl.register)

module.exports = router