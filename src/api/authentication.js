const router = require('express').Router();

const { signIn, signUp } = require('../controllers/auth');

router.post('/auth/sign-up', signUp);
router.post('/auth/sign-in', signIn);

module.exports = router;
