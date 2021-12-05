const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const sendEmail = require('../services/email-service');

// Updated to Mongoose
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid inputs', 400));
  }

  // Extract fields from body
  const { email, password, name } = req.body;

  // Check if email already exists in the DB

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError('Singup failed, please try again', 500));
  }

  if (existingUser) {
    return next(
      new HttpError('Error, an user with that email already exists', 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Singup failed, please try again', 500));
  }

  // Create User object with body info
  const user = new User({
    name,
    email,
    password: hashedPassword,
    places: [],
    requests: [],
  });

  try {
    await user.save();
  } catch (error) {
    return next(new HttpError('Singup failed, please try again', 500));
  }

  // TODO: Send email for verification

  res.status(201).json({ message: 'Signup succesfull!' });
};

// Updated to use mongoose
const signin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid inputs', 400));
  }

  // Extract fields from body
  const { email, password } = req.body;

  // Check if email already exists in the DB

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Singup failed (email), please try again', 500));
  }

  if (!user) {
    return next(new HttpError('Error, invalid email', 401));
  }

  // Check hashed password
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    return next(
      new HttpError('Singup failed (password), please try again', 500)
    );
  }

  if (!isValidPassword)
    return next(new HttpError('Error, invalid password', 401));

  // Generate JWT token
  let token;
  try {
    token = jwt.sign(
      {
        userId: user.id,
        email: user.mail,
        role: user.role,
      },
      process.env.PRIVACY_KEY,
      { expiresIn: '1h' }
    );
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Error generating response', 500));
  }

  res.status(201).json({ userId: user.id, name: user.name, email: user.email, roles: [user.role], accessToken: token });
};

// Updated to use mongoose
const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid inputs', 400));
  }

  // Extract fields from body
  const { email } = req.body;

  // Check if email already exists in the DB

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    console.log(error.message);
    return next(
      new HttpError('reset password failed (email), please try again', 500)
    );
  }

  if (!user) {
    return next(new HttpError('Error, invalid email', 401));
  }

  // Generate random password
  const newPassword = generator.generate({
    length: 10,
    numbers: true,
  });
  // newPassword = 'random_password';

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Reset password failed, please try again', 500));
  }

  // Update User object with new password
  user.password = hashedPassword;
  try {
    await user.save();
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Reset password failed, please try again', 500));
  }

  const resetEmail = {
    recipient: user.email,
    subject: 'Su nueva contraseña para HogaColombia',
    emailBody: `Hola ${user.name}, se ha generado el siguiente password para su cuenta:
    "${newPassword}"`,
  };

  return sendEmail(resetEmail)
    .then(() => res.json({ message: 'Email sent' }))
    .catch((err) =>
      next(new HttpError('Error sending the message, please try again', 500))
    );

  // res.status(201).json({ message: 'Reset password succesfull! Check your email' });
};

// Updated to Mongoose
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, 'name email role');
  } catch (error) {
    return next(new HttpError('Something went wrong, please try again', 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// Return a single user object
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.uid, 'email role');
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Something went wrong, please try again', 500));
  }
  if (!user) {
    return next(new HttpError('Could not find user with that id ', 500));
  }
  res.json({ user: user.toObject({ getters: true }) });
};

// Delete one user with provided id
const deleteUser = async (req, res, next) => {
  let response;
  try {
    response = await User.deleteOne({ _id: req.params.uid });
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Something went wrong, please try again', 500));
  }
  res.json(response);
};

// Update one user with provided id
const patchUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid inputs', 400));
  }

  // Extract fields from body
  const { role } = req.body;

  let user;
  try {
    user = await User.findById(req.params.uid);
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Something went wrong, please try again', 500));
  }
  if (!user) {
    return next(new HttpError('Could not find user with that id ', 500));
  }

  // Update role
  user.role = role;

  try {
    await user.save();
  } catch (error) {
    console.log(error.message);
    return next(new HttpError('Something went wrong, please try again', 500));
  }
  res.json({ message: 'user updated!' });
};

exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.patchUser = patchUser;
exports.signup = signup;
exports.signin = signin;
exports.resetPassword = resetPassword;
