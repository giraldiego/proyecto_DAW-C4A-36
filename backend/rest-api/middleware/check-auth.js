const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

function authUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Token not found on headers');
    }
    const decodedToken = jwt.verify(token, process.env.PRIVACY_KEY);
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Authentication failed!', 401));
  }
}

function authRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.userData.role)) {
      return next(new HttpError('Authentication failed!', 401));
    }
    next();
  };
}

module.exports = {
  authUser,
  authRole,
};
