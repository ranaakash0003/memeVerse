const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send({ success: false, message: 'Access denied, No token provided' });

    try {
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, user) => {
            if (error) {
                return res.status(401).send({ success: false, message: 'Authentication failed.' });
            }
            req.authUser = user;
            return next();
        });
        return false;
    } catch (error) {
        return next(error);
    }
};

module.exports = checkAuth;
