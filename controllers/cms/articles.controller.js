const { errorMsg } = require("../../library/functions")
const Article = require('../../models/article.model.js')
const { unlinkSync } = require('node:fs')

class ArticlesController {
    index = async (req, res, next) => {
        try {
            const articles = await Article.find()

            res.send(articles)
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { title, content, categoryId } = req.body

            const image = req.file ? req.file.filename : null

            await Article.create({ title, image, content, categoryId })

            res.status(201).send({
                message: 'Article added!'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const {id} = req.params

            const article = await Article.findById(id)

            if(article) {
                res.send(article)
            } else {
                next({
                    message: 'Article not found!',
                    status: 404,
                })
            }
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { title, content, categoryId } = req.body
            const { id } = req.params

            const article = await Article.findById(id)

            let image = article.image
            
            if(req.file) {
                image = req.file.filename

                if(article.image) {
                    unlinkSync(`./uploads/${article.image}`)
                }
            }

            await Article.findByIdAndUpdate(id, { title, content, categoryId, image })

            res.send({
                messsage: 'Article updated!'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const article = await Article.findById(id)

            if (article.image) {
                unlinkSync(`./uploads/${article.image}`)
            }

            await Article.findByIdAndDelete(id)

            res.send({
                message: 'Article deleted!'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new ArticlesController