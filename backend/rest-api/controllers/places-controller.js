const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');

// Updated for mongoose
const getAllPlaces = async (req, res, next) => {
  let places;

  try {
    places = await Place.find();
  } catch (error) {
    return next(new HttpError('Something went wrong, please try again', 500));
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

// Updated for mongoose
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Something went wrong, please try again', 500));
  }

  if (!place) {
    return next(new HttpError('Could not find a place for the provided id.', 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
};

// Update for mongoose
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Something went wrong, please try again', 500));
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({
    places: places.map((place) => place.toObject({ setters: true })),
  });
};

// Updated for mongoose
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid inputs', 422));
  }

  const { city, type, offerType, creator } = req.body;

  const place = new Place({
    city,
    type,
    offerType,
    creator,
  });

  // Check if the userId provided is a valid one
  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    console.log(error.message);
    new HttpError(
      'Error creating the place, please try again',
      500
    );
  }

  if (!user) return next(new HttpError('User does not exist', 404));

  // Create the place in mongo DB
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.save({ session: session }); // Save the place with the user relation
    user.places.push(place); // Add the place to the user's places field
    await user.save({session: session }); // Save the user
    await session.commitTransaction(); // Commit everything
  } catch (error) {
    console.log(error.message);
    return next(
      new HttpError('Error creating the place, please try again', 500)
    );
  }
  res.status(201).json({ place: place });
};

// TODO: Implement relation User-Place
const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs', 400);
  }

  const { offerType } = req.body;
  const placeId = req.params.pid;

  // Get the place by the place id, throw error if cant find
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError('Something went wrong, please try again', 500));
  }

  if (!place) {
    next(new HttpError('Could not find a place for the provided id.', 404));
  }

  // Update the changes manually :S
  place.offerType = offerType;

  // patch the place using mongoose
  try {
    await place.save();
  } catch (error) {
    return next(new HttpError('Something went wrong, please try again', 500));
  }

  // return something
  res.json({ place: place.toObject({ getters: true }) });
};

// Updated to mongoose
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  // Get the place by the place id, throw error if cant find
  let place;
  try {
    place = await Place.findById(placeId).populate('creator'); // Populate the field creator with the User Object
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Something went wrong, please try again', 500));
  }

  if (!place) {
    next(new HttpError('Could not find a place for the provided id.', 404));
  }

  // console.log(place);

  // remove the place using mongoose
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.remove({ session: session });
    await place.creator.places.pull(place);
    await place.creator.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    console.log(errro.message);
    return next(new HttpError('Something went wrong, please try again', 500));
  }

  // return something
  res.status(200).json({ message: 'Place deleted' });
};

exports.getAllPlaces = getAllPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;