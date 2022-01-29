const Joi = require("joi");
const mongoose = require("mongoose");


const genreSchema = new mongoose.Schema({
  name: String
})
const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
  })
);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate({ name: genre });
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;
