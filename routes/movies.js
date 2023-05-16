const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');

const url = /^(https?:\/\/)(www\.)?([a-z1-9-]{2,}\.)+[a-z]{2,}\/?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/i;

router.get('/', getUserMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().regex(url).required(),
    trailerLink: Joi.string().uri().regex(url).required(),
    thumbnail: Joi.string().uri().regex(url).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:objectId', celebrate({
  params: Joi.object().keys({
    objectId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
