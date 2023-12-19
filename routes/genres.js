const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

// get all genres
router.get("/", (req, res) => {
  res.send(genres);
});

// get single genre
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === Number(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("Genre with id " + req.params.id + " not found");
  res.send(genre);
});

// post a new genre
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(newGenre);

  res.send(newGenre);
});

// update genre
router.put("/:id", (req, res) => {
  // check if the genre exists
  const genre = genres.find((g) => g.id === Number(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("Genre with id " + req.params.id + " not found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;

  res.send(genre);
});

// delete single genre
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === Number(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("Genre with id " + req.params.id + " not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

// validate genre
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router;
