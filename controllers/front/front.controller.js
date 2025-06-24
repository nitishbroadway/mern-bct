const { errorMsg } = require("../../library/functions")
const Article = require("../../models/article.model")
const Category = require("../../models/category.model")
const Comment = require("../../models/comment.model")

class FrontController {
    articles = async (req, res, next) => {
        try {
            const articles = await Article.find()

            res.send(articles)
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    articleById = async (req, res, next) => {
        try {
            const { id } = req.params

            const article = await Article.findById(id)

            if (article) {
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
    
    articleByCategoryId = async (req, res, next) => {
        try {
            const { id } = req.params

            const articles = await Article.find({categoryId: id})

            res.send(articles)
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    categories = async (req, res, next) => {
        try {
            const categories = await Category.find()

            res.send(categories)
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    categoryById = async (req, res, next) => {
        try {
            const { id } = req.params

            const categories = await Category.findById(id)

            res.send(categories)
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    commentsByArticleId = async (req, res, next) => {
        try {
            const { id } = req.params

            const comments = await Comment.find({articleId: id})

            res.send(comments)
        } catch (error) {
            errorMsg(error, next)
        }
    }
    
    commentCreate = async (req, res, next) => {
        try {
            const { id } = req.params

            const {name, email, content} = req.body

            await Comment.create({name, email, content, articleId: id})

            res.send({
                message: 'Thank you for your comment!',
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new FrontController