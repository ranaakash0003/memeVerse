const app = require('./app');
const connectDb = require('./src/config')

const port = process.env.PORT || 8000;

connectDb();

app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});