const express = require('express');
const router = express.Router();
const Joi = require("joi");
const morgan = require('morgan')

router.use(morgan('tiny'));


const genres = [
    { id: 1, name: "action" },
    { id: 2, name: "comedy" },
    { id: 3, name: "terror" },
  ];

  router.get("/", (req, res) => {
    res.send(genres);
  });
  
  router.get("/:id", (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre doesn't exists");
    res.send(genre);
  });
  
  router.post("/", (req, res) => {
    const { error } = validateGenre(req.body.name);
    if (error) return res.status(400).send("Error with genre");
  
    const genre = { id: genres.length + 1, name: req.body.name };
    genres.push(genre);
    res.send(genre);
  });
  
  router.put("/:id", (req, res) => {
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre doesn't exists");
  
    const { error } = validateGenre(req.body.name);
    if (error) return res.status(400).send("Error with genre");
  
    genre.name = req.body.name;
    res.send(genre);
  });
  
  router.delete("/:id", (req, res) => {
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
  
module.exports = router;