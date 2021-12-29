const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan')
const express = require("express");
const Joi = require("joi");

console.log('process:' + process.env.NODE_ENV)

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());

console.log('Name: ' + config.get('name'))
console.log('Mail Adress: ' + config.get('mail.adress'));
console.log('Mail Password: ' + config.get('mail.password'));



if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    console.log('development: morgan activated...')
}
const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "comedy" },
  { id: 3, name: "terror" },
];

app.get("/", (req, res) => res.send("Welcome to Vidly"));

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre doesn't exists");
  res.send(genre);
});

app.post("/api/genres/", (req, res) => {
  const { error } = validateGenre(req.body.name);
  if (error) return res.status(400).send("Error with genre");

  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre doesn't exists");

  const { error } = validateGenre(req.body.name);
  if (error) return res.status(400).send("Error with genre");

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre doesn't exists");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate({ name: genre });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`));
