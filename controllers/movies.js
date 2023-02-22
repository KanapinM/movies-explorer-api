const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/constants');

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
  // 63f31fb2d2872060c66bbe78
  console.log(req.user);
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(err.message));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      const potentialUserId = req.user._id;
      const ownerUserId = movie ? movie.owner._id.toString() : false;

      if (!movie) {
        return next(new NotFoundError(errorMessages.filmNotFound));
      } if (potentialUserId !== ownerUserId) {
        return next(new Forbidden(errorMessages.removeNotOwnerFilm));
      }
      return Movie.remove(movie)
        .orFail(() => {
          next(new NotFoundError(errorMessages.filmNotFound));
        })
        .then(() => res.send({ massage: 'Фильм удалён' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(errorMessages.incorrectFilmData));
      }
      next(err);
    });
};
