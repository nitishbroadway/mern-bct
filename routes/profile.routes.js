const {Router} = require('express')
const ProfileCtrl = require('../controllers/profile/profile.controller.js')

const router = Router()

router.get('/details', ProfileCtrl.details)

router.put('/update', ProfileCtrl.update)
router.patch('/update', ProfileCtrl.update)

module.exports = router