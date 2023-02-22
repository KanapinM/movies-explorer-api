const mongoose = require('mongoose');
const validator = require('validator');
const { errorMessages } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: errorMessages.incorrectImageUrl,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: errorMessages.incorrectTrailerUrl,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: errorMessages.incorrectThumbnailUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // link: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: (v) => validator.isURL(v),
  //     message: 'Некорректный URL',
  //   },
  // },
  // likes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: [],
  //   ref: 'user',
  // }],
  // createdAt: {
  //   type: Date,
  //   createdAt: Date.now,
  // },
});

module.exports = mongoose.model('movie', movieSchema);
