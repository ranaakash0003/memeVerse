const router = require('express').Router();
const uploadMulter = require('../middlewares/upload')
const validation = require('../middlewares/validation')
const checkAuth  = require('../middlewares/auth')


const { getAllMeme, addMeme } = require('../controllers/meme');

router.get('/', getAllMeme);
router.post('/', checkAuth, uploadMulter, validation, addMeme);

module.exports = router;
