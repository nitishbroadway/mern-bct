const { errorMsg } = require("../../library/functions")
const Comment = require('../../models/comment.model.js')

class CommentsController {
    index = async (req, res, next) => {
        try {
            const comments = await Comment.find()

            res.send(comments)
        } catch(error) {
            errorMsg(error, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            await Comment.findByIdAndDelete(id)

            res.send({
                message: 'Comment deleted!'
            })
        } catch (error) {
            errorMsg(error, next)
        }
    }
}

module.exports = new CommentsController