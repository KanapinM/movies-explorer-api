const movies = require('express').Router();
const {
  createMovieValidation,
  idValidation,
} = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movies.get('/', getMovies);
movies.post('/', createMovieValidation(), createMovie);

movies.delete('/:movieId', idValidation(), deleteMovie);

module.exports = movies;
