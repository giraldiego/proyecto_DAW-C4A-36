const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const placesController = require('../controllers/places-controller');
const {authUser, authRole} = require('../middleware/check-auth');

router.get('/', placesController.getAllPlaces);

router.get('/:pid', placesController.getPlaceById);

// After this point, only authenticated users are allowed
router.use(authUser);

router.get('/user/:uid', placesController.getPlacesByUserId);

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
