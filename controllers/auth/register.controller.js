const bcrypt = require('bcryptjs')
const User = require('../../models/user.model.js')
const { errorMsg } = require('../../library/functions.js')

class RegisterController {
    register = async (req, res, next) => {
        try {
            const {name, email, password, phone, address} = req.body

            const hash = bcrypt.hashSync(password)

            await User.create({name, email, phone, address, password: hash, role: 'Author'})

            res.status(201).send({
                message: 'Registration successful!'
            })
        } catch(error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new RegisterController// code here