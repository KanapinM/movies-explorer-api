const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages, successMessages } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(err.message));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      const potentialUserId = req.user._id;

      if (!movie) {
        return next(new NotFoundError(errorMessages.filmNotFound));
      } if (potentialUserId !== movie.owner._id.toString()) {
        return next(new Forbidden(errorMessages.removeNotOwnerFilm));
      }
      return Movie.remove(movie)
        .orFail(() => {
          next(new NotFoundError(errorMessages.filmNotFound));
        })
        .then(() => res.send({ message: successMessages.removeMovieMessage }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(errorMessages.incorrectFilmData));
      }
      next(err);
    });
};
