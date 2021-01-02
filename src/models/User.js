const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        min:6,
        max:50,
        required: true,
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User 