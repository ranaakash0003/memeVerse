const { userSchema } = require('../validators')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { genarateAuthToken } = require('../utils')


const signUp = async(req, res, next) => {
    try{
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        await userSchema.validate(newUser, { abortEarly: false })
        const existedUser = await User.findOne({ email: newUser.email })

        if(existedUser){
            return res.status(400).send({ success: false, message: 'User already registered '})
        }
        const user = new User({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        const createdUser = await user.save();
        const token = genarateAuthToken(createdUser)

        return res.status(200).send({ success: true, message:'Registration successful', token})

    }
    catch (error) {
        next(error)
    }
}

const signIn = async(req, res , next) => {
    try {
        const {email, password} = req.body;
        const existedUser = await User.findOne({email: email})

        if(!existedUser){
            return res.status(400).send({success: false, message: 'User does not exist'})
        }

        const validPassword = await bcrypt.compare(password, existedUser.password)
        if(!validPassword){
            return res.status(400).send({success: false, message: 'Invalid email or password'})
        }

        const token = genarateAuthToken(existedUser)
        return res.status(200).send({ success: true, message:'Sign In successful', token})

    }
    catch(error){
        next(error)
    }
}

module.exports = { signIn, signUp }