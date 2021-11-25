const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { authUser, authRole } = require('../middleware/check-auth');

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
  '/login',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.login
);

router.post(
  '/reset-password',
  [check('email').normalizeEmail().isEmail()],
  usersController.resetPassword
);

// After this point, only authenticated users are allowed
router.use(authUser);

router.get('/:uid', usersController.getUser);

// After this point, only admin users are allowed
router.use(authRole('admin'));

router.get('/', usersController.getAllUsers);

router.delete('/:uid', usersController.deleteUser);

module.exports = router;
