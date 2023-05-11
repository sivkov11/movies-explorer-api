const Movie = require('../models/movie');
const InaccurateDataError = require('../errors/inaccurate-data-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: userId,
  })
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError());
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { objectId } = req.params;

  Movie.findById(objectId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError();
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError();
      }

      return movie;
    })
    .then((movie) => {
      Movie.deleteOne(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError());
        return;
      }

      next(err);
    });
};
