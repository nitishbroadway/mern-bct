const { errorMsg } = require("../../library/functions")
const Category = require('../../models/category.model.js')

class CategoriesController {
    index = async (req, res, next) => {
        try {
            const categories = await Category.find()

            res.send(categories)
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name } = req.body

            await Category.create({ name })

            res.status(201).send({
                message: 'Category added!'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const {id} = req.params

            const category = await Category.findById(id)

            if(category) {
                res.send(category)
            } else {
                next({
                    message: 'Category not found!',
                    status: 404,
                })
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { name } = req.body
            const { id } = req.params

            await Category.findByIdAndUpdate(id, { name })

            res.send({
                messsage: 'Category updated!'
            })
        } catch (error) {
            errorMsg(error)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            await Category.findByIdAndDelete(id)

            res.send({
                message: 'Category deleted!'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new CategoriesController