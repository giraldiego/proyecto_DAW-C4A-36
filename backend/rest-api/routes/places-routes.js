const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const placesController = require('../controllers/places-controller');
const { authUser, authRole } = require('../middleware/check-auth');

// Everyone can see the list of places
router.get('/', placesController.getAllPlaces);

// After this point, only authenticated users are allowed
router.use(authUser);

// To get details about a place
router.get('/:pid', placesController.getPlaceById);

// To create and edit places, only asesores allowed
// TODO: Restrict some operations to only owners
router.post(
  '/',
  [
    check('city').not().isEmpty(),
    check('type').not().isEmpty(),
    check('offerType').not().isEmpty(),
    check('creator').not().isEmpty(),
  ],
  authRole('asesor'),
  placesController.createPlace
);

router.patch(
  '/:pid',
  [check('offerType').not().isEmpty()],
  authRole('asesor'),
  placesController.updatePlace
);

router.delete('/:pid', authRole('asesor'), placesController.deletePlace);

// To see a list of places you own
router.get(
  '/user/:uid',
  authRole('asesor'),
  placesController.getPlacesByUserId
);

module.exports = router;
