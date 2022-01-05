const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan')
const express = require("express");
const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/', home)

console.log('process:' + process.env.NODE_ENV)
/* console.log('Name: ' + config.get('name'))
console.log('Mail Adress: ' + config.get('mail.adress'));
console.log('Mail Password: ' + config.get('mail.password'));
 */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    console.log('development: morgan activated...')
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`));
