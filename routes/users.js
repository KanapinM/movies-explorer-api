const users = require('express').Router();
const { updateProfileValidation } = require('../middlewares/validation');
const {
  getMe,
  updateProfile,
} = require('../controllers/users');

users.get('/me', getMe);

users.patch('/me', updateProfileValidation(), updateProfile);

module.exports = users;
