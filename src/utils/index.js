const jwt = require('jsonwebtoken')

const genarateAuthToken = (user) => {
    const token = 
        jwt.sign({ id: user.id}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1h'})
    return token
}
module.exports = { genarateAuthToken }