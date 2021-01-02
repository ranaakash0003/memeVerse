const { memeSchema } = require('../validators')
const Meme = require('../models/Meme')


const getAllMeme = async(req, res, next) => {
    try{
        const memes = await Meme.find()
        return res.status(200).send({ success: true, message:'Fetch memes successful', memes})
    }
    catch(error){
        next(error)
    }
}


const addMeme = async (req, res, next) => {
    try{
        console.log(req.authUser);
        const newMeme = {
            title: req.body.title,
            image: req.file.path,
            postedBy: req.authUser.id,
        }
        await memeSchema.validate(newMeme, { abortEarly: false })
     
        const meme = new Meme({
            ...newMeme,
            likes:[],
            comments: []
        })

        const createdMeme = await meme.save();

        return res.status(200).send({ success: true, message:'Meme saved successfully',createdMeme })

    }
    catch (error) {
        console.log(error);
        next(error)
    }
}

// const like = async (req, res, next) => {
//     // todo next
// }

// const disLike = async (req, res, next) => {
//     // todo next
// }

// const comment = async (req, res, next) => {
//     // todo next
// }

module.exports = { getAllMeme, addMeme  }