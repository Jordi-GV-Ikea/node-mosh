const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan')
const express = require("express");
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/', home)

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("Error with mongoDB", err));

console.log('process:' + process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    console.log('development: morgan activated...')
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`));
