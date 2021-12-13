const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post(
  '/signin',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signin
);

router.post(
  '/reset-password',
  [check('email').normalizeEmail().isEmail()],
  usersController.resetPassword
);

module.exports = router;
