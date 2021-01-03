const yup = require('yup')

const userSchema = yup.object().shape({
    name: yup.string().min(2).required(),
    email:yup.string().email().required(),
    password: yup.string()
                 .min(6, 'password must be at least 6 characters.')
                 .max(50, 'password can not be more than 50 characters.')
                 .required()
})

const memeSchema = yup.object().shape({
    title: yup.string().min(2).required(),
    image: yup.string().required(),
    postedBy: yup.string().required(),
    likes: yup.array(yup.string()),
    comment: yup.array(yup.string().max(800)),
    
})

module.exports = { userSchema, memeSchema }