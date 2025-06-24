const jwt = require('jsonwebtoken')
const { jwtKey } = require('./constants')
const User = require('../models/user.model')
const multer = require('multer')

const auth = async (req, res, next) => {
    try {
        if('authorization' in req.headers) {
            const token = req.headers.authorization.split(' ').pop()

            const decoded = jwt.verify(token, jwtKey)

            const user = await User.findById(decoded.uid)

            req.user = user

            next()
        } else {
            next({
                message: 'Auth token is missing!',
                status: 401,
            })
        }
    } catch(error) {
        next({
            message: 'Auth token is invalid!',
            status: 401,
        })
    }
}

const adminOnly = (req, res, next) => {
    if(req.user.role == 'Admin') {
        next()
    } else {
        next({
            message: 'Access denied!',
            status: 403,
        })
    }
}

const upload = () => multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            const ext = file.originalname.split('.').pop()
            const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + `.${ext}`

            cb(null, filename)
        },
        destination: (req, file, cb) => {
            cb(null, './uploads')
        }
    })
})

module.exports = {auth, adminOnly, upload}