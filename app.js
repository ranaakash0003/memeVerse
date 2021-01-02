const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { notFound, errorHandler } = require('./src/middlewares/error')

const helmet = require('helmet');
const app = express();

app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

const authRoute = require('./src/api/authentication')
const memeRoute = require('./src/api/meme')


app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to MemeVerse API.' });
});

app.use('/api/v1', authRoute)
app.use('/api/v1', memeRoute)

app.use(notFound);
app.use(errorHandler);

module.exports = app;