require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

// Import routers
const authRouter = require('./routes/auth-routes');
const placesRouter = require('./routes/places-routes');
const usersRouter = require('./routes/users-routes');
const miscRouter = require('./routes/misc-routes');

const HttpError = require('./models/http-error');

// TODO: Disable this for production!!!
// allowing CORS for all resources on your server.
const cors = require('cors');
app.use(cors());
app.use(
    cors({
        origin: 'http://localhost:4200',
    })
);

// Add json parser
app.use(express.json());

// Register routes
app.use('/api/auth', authRouter);
app.use('/api/places', placesRouter);
app.use('/api/users', usersRouter);
app.use('', miscRouter);


// Add error for unsupported routes
app.use((req, res, next) => {
    throw new HttpError('Invalid route', 404);
})

// Add a custom error handler
app.use((err, req, res, next) => {
    // Check if a response has been already sent,
    // and forward the error if so.
    if (res.headerSent) {
        return next(err);
    }
    res.status(err.code || 500);
    res.json({message: err.message || 'An unknown error ocurred!'});
})

// Connect to Mongo DB
mongoose.connect(process.env.CONNECTION_STRING)
// mongoose.connect('mongodb://localhost:27017/hogarColombiaLocal')
    .then(console.log('Connected to the DB'))
    .catch(err => {console.log('Error connecting to the DB', err.message)})

const db = mongoose.connection;
db.on('error', (err) => console.log('Error:', err.message));

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})
