const { celebrate, Joi } = require('celebrate');

const RegExp = /https?[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+/;

const signUpValidation = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    // about: Joi.string().min(2).max(30),
    // avatar: Joi.string().regex(RegExp),
    email: Joi.string().required(true).email(),
    password: Joi.string().required(true).min(6),
  }).unknown(true),
});

const signInValidation = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(true).email(),
    password: Joi.string().required(true).min(6),
  }).unknown(true),
});

const updateProfileValidation = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(true).min(2).max(30),
    email: Joi.string().required(true).email(),
  }).unknown(true),
});

// const getUserValidation = () => celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required(true).hex().length(24),
//   }).unknown(true),
// });

// const updateAvatarValidation = () => celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required(true).regex(RegExp),
//   }).unknown(true),
// });

const createMovieValidation = () => celebrate({
  body: Joi.object().keys({
    // name: Joi.string().required(true).min(2).max(30),
    // link: Joi.string().required(true).regex(RegExp),
    country: Joi.string().required(true).min(2).max(30),
    director: Joi.string().required(true).min(2).max(30),
    duration: Joi.number().required(true),
    year: Joi.number().required(true),
    description: Joi.string().required(true).min(2).max(30),
    image: Joi.string().required(true).regex(RegExp),
    trailer: Joi.string().required(true).regex(RegExp),
    thumbnail: Joi.string().required(true).regex(RegExp),
    movieId: Joi.string().required(true).hex().length(24),
    nameRU: Joi.string().required(true).min(2).max(30),
    nameEN: Joi.string().required(true).min(2).max(30),
  }).unknown(true),
});

const idValidation = () => celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(true).hex().length(24),
  }).unknown(true),
});

module.exports = {
  signInValidation,
  signUpValidation,
  updateProfileValidation,
  // updateAvatarValidation,
  // getUserValidation,
  createMovieValidation,
  idValidation,
};
