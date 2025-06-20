const { jwtKey } = require("../../library/constants.js")
const { errorMsg, validationMsg } = require("../../library/functions.js")
const User = require("../../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class LoginController {
    login = async (req, res, next) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})

            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        uid: user._id,
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
                    }, jwtKey)

                    res.send({token})
                } else {
                    validationMsg(next, {
                        password: 'Given password is incorrect.'
                    })
                }
            } else {
                validationMsg(next, {
                    email: 'Given email is not registered!'
                })
            }
        } catch(error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new LoginController