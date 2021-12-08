const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { authUser, authRole } = require('../middleware/check-auth');

const usersController = require('../controllers/users-controller');

// After this point, only authenticated users are allowed
router.use(authUser);

//TODO: Restrict to only owner or admin
router.get('/:uid', usersController.getUser);

// After this point, only admin users are allowed
router.use(authRole('admin'));

router.get('/', usersController.getAllUsers);

router.delete('/:uid', usersController.deleteUser);

// TODO: Validate role from possible options
router.patch(
  '/:uid',
  [
    check('name').not().isEmpty(),
    check('email').not().isEmpty(),
    check('role').not().isEmpty()
  ],
  usersController.patchUser
);

module.exports = router;
