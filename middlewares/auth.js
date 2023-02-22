require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const { errorMessages } = require('../utils/constants');

const auth = (req, res, next) => {
  const JWT = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(JWT, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized(errorMessages.unauthorized));
  }

  req.user = payload;

  return next();
};
module.exports = auth;