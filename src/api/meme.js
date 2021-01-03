const router = require('express').Router();
const uploadMulter = require('../middlewares/upload')
const validation = require('../middlewares/validation')
const checkAuth  = require('../middlewares/auth')


const { getAllMeme, addMeme, reactMeme, commentMeme } = require('../controllers/meme');

router.get('/', getAllMeme);
router.post('/', checkAuth, uploadMulter, validation, addMeme);
router.patch('/:id/reaction', checkAuth, reactMeme);
router.patch('/:id/comment', checkAuth, commentMeme);



module.exports = router;
