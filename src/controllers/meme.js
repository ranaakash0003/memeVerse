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

const reactMeme = async (req, res, next) => {
   try{
    const id = req.authUser.id
    let meme = await Meme.findById(req.params.id)
    
    if( !meme.likes.includes(id)){
        meme.likes.push(id)
    }
    else{
        meme.likes = meme.likes.filter((userId) => userId.toString() !== id.toString())
    }
    await memeSchema.validate(meme, { abortEarly: false })
    await Meme.findByIdAndUpdate(req.params.id, meme)
    return res.status(200).send({ success: true, message:'liked successfully', meme })
   }
   catch (error) {
    next(error)
}
}

const commentMeme = async (req, res, next) => {
    try{
        const id = req.authUser.id
        let meme = await Meme.findById(req.params.id)
        if(!meme){
            return res.status(200).send({ success: true, message:'meme not found' })
        }

        const newComment = {
            user: id,
            text: req.body.text,
        }
        
        meme.comments.push(newComment)
        
        await Meme.findByIdAndUpdate(req.params.id, meme)
        return res.status(200).send({ success: true, message:'comment successfull', meme })
       }
       catch (error) {
        next(error)
    }
}

module.exports = { getAllMeme, addMeme, reactMeme, commentMeme  }