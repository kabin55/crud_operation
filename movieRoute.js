const express = require("express");
const router = express.Router();

const movies = [
  { id: 1, movie: "The Shawshank Redemption", rating: 9.3 },
  { id: 2, movie: "The Godfather", rating: 9.2 },
  { id: 3, movie: "The Dark Knight", rating: 9.0 },
  { id: 4, movie: "Pulp Fiction", rating: 8.9 },
  { id: 5, movie: "Forrest Gump", rating: 8.8 },
  { id: 6, movie: "Inception", rating: 8.8 },
  { id: 7, movie: "The Matrix", rating: 8.7 },
];

const findId = () => {
  return (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (id <= 0) {
      res.status(400).send(`Invalid id ${id}`);
    }
    const searchMovie = movies.find((m) => m.id === id);
    if (!searchMovie) {
      return res.status(404).send(`Movie of ${id} not found`);
    }
    req.movie = searchMovie;
    req.movieIndex = movies.findIndex((m) => m.id === id);
    next();
  };
};

router.get("/", (req, res) => {
  res.status(200).json(movies);
});

router.get("/:id", findId(), (req, res) => {
  res.status(200).json(req.movie);
});

router.post("/", (req, res) => {
  const newMovie = req.body;
  if (!newMovie.id || !newMovie.movie || !newMovie.rating) {
    return res.status(403).send(`Incomplete entry field`);
  }
  if (movies.find((m) => m.id === newMovie.id)) {
    return res.status(409).send(`Movie with ID ${newMovie.id} already exists.`);
  }
  movies.push[newMovie];
  res.status(200).json(movies);
});

router.put("/:id", findId(), (req, res) => {
  const { movie, rating } = req.body;
  if (movie) req.movie.movie = movie;
  if (rating) req.movie.rating = rating;

  res.status(200).send(`Movie with ID ${req.movie.id} has been updated.`);
});

router.delete("/:id", findId(), (req, res) => {
  console.log(req.movie);
  const deletedMovies = movies.splice(req.movieIndex, 1);
  res.status(200).json({
    message: `Movie with ID ${req.movie.id} has been deleted.`,
    deletedMovie: deletedMovies[0],
  });
});

module.exports = router;
