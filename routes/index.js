const index = require('express').Router();

const users = require('./users');
const movies = require('./movies');
const { signInValidation, signUpValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/constants');

index.post('/signin', signInValidation(), login);
index.post('/signup', signUpValidation(), createUser);
index.post('/logout', logout);
index.use(auth);
index.use('/movies', movies);
index.use('/users', users);
index.use((req, res, next) => {
  next(new NotFoundError(errorMessages.error404));
});

module.exports = { index };
