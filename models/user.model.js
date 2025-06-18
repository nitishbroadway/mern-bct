const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String},
    role: {type: String, required: true, enum: ['Admin', 'Author']}
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})

const User = model('User', userSchema)

module.exports = User