const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    content: {type: String, required: true},
    articleId: {type: Schema.Types.ObjectId, ref: 'Article', required: true},
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})

const Comment = model('Comment', commentSchema)

module.exports = Comment