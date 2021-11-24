const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

function authUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Token not found on headers');
    }
    const decodedToken = jwt.verify(token, 'privacy_key');
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Authentication failed!', 401));
  }
}

function authRole(role) {
  return (req, res, next) => {
    if (req.userData.role !== role) {

      return next(new HttpError('Authentication failed!', 401));
    }
    next();
  };
}

module.exports = {
  authUser,
  authRole,
};
