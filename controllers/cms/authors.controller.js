const { errorMsg } = require("../../library/functions")
const User = require('../../models/user.model.js')
const bcrypt = require('bcryptjs')

class AuthorsController {
    index = async (req, res, next) => {
        try {
            const authors = await User.find({role: 'Author'})

            res.send(authors)
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, email, password, phone, address } = req.body

            const hash = bcrypt.hashSync(password)

            await User.create({ name, email, phone, address, password: hash, role: 'Author' })

            res.status(201).send({
                message: 'Author added!'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const {id} = req.params

            const author = await User.findById(id)

            if(author) {
                res.send(author)
            } else {
                next({
                    message: 'Author not found!',
                    status: 404,
                })
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { name, phone, address } = req.body
            const { id } = req.params

            await User.findByIdAndUpdate(id, { name, phone, address })

            res.send({
                messsage: 'Author updated!'
            })
        } catch (error) {
            errorMsg(error)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            await User.findByIdAndDelete(id)

            res.send({
                message: 'Author deleted!'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new AuthorsController