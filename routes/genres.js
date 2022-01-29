const express = require("express");
const router = express.Router();
const morgan = require("morgan");
router.use(morgan("tiny"));
const {Genre, validateGenre} = require('../models/genre')
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id );
  if (!genre) return res.status(404).send("Genre doesn't exists");
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body.name);
  if (error) return res.status(400).send("Error with genre");

  let genre = await new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body.name);
  if (error) return res.status(400).send("Error with genre");

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("Genre doesn't exists");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  console.log('id:',req.params.id);
  const genre = await Genre.findOneAndRemove({_id:req.params.id} );
  if (!genre) return res.status(404).send("Genre doesn't exists");
  res.send(genre);
});

module.exports = router;
