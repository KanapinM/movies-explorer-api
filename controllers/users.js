require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { errorMessages } = require('../utils/constants');

// const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name,
        email,
        _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(errorMessages.incorrectUserData));
      } if (err.code === 11000) {
        return next(new Conflict(errorMessages.userUniq));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET', { expiresIn: '7d' });
      return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .send({ token });
    })
    .catch(next);
};
module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из аккаунта' });
  next();
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      next(new NotFoundError(errorMessages.userNotFound));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(errorMessages.incorrectUserData));
      }
      next(err);
    });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new NotFoundError(errorMessages.userNotFound));
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(() => {
      next(new NotFoundError(errorMessages.userNotFound));
    })
    .then((updateProfile) => res.send(updateProfile))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(errorMessages.incorrectUserData));
      }
      next();
    });
};
