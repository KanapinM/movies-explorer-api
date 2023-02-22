/* eslint-disable no-unused-vars */
const users = require('express').Router();
const { updateProfileValidation, getUserValidation } = require('../middlewares/validation');
const {
  getUsers,
  getUser,
  getMe,
  updateProfile,
} = require('../controllers/users');

// users.get('/', getUsers);
users.get('/me', getMe);
// users.get('/:userId', getUserValidation(), getUser);

users.patch('/me', updateProfileValidation(), updateProfile);

module.exports = users;
