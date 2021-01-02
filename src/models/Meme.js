const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    likes:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
      }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
}, {timestamps: true})

const Meme = mongoose.model('Meme', memeSchema)
module.exports = Meme 