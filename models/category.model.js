const {Schema, model} = require('mongoose')

const categorySchema = new Schema({
    name: {type: String, required: true},
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})

const Category = model('Category', categorySchema)

module.exports = Category