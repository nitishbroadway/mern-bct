const {Schema, model} = require('mongoose')

const articleSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String, required: false},
    categoryId: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})

const Article = model('Article', articleSchema)

module.exports = Article