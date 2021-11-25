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

// To create and edit places, only asesores and admins are allowed
router.use(authRole('asesor','admin'));

// To see a list of places from a specific user
router.get(
  '/user/:uid',
  placesController.getPlacesByUserId
);

router.post(
  '/',
  [
    check('city').not().isEmpty(),
    check('type').not().isEmpty(),
    check('offerType').not().isEmpty(),
    check('creator').not().isEmpty(),
  ],
  placesController.createPlace
);

router.patch(
  '/:pid',
  [check('offerType').not().isEmpty()],
  placesController.updatePlace
);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;
