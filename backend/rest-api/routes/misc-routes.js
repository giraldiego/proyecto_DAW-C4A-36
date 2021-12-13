const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const sendEmail = require('../services/email-service');

// Boiler plate route
router.get('/', (req, res) => {
  res.send('Hogar Colombia backend');
});

// Route for contact us form
router.post(
  '/api/contactus',
  [check('message').not().isEmpty(), check('from').normalizeEmail().isEmail()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return next(new HttpError('Invalid inputs', 400));
    }

    // Extract fields from body
    const { message, from } = req.body;

    const email = {
      // TODO: Set to newUser.email later
      recipient: process.env.ADMIN_EMAIL,
      subject: 'Mensaje de un interesado en HogarColombia',
      emailBody: `Hola administrador, ${from} le ha dejado el siguiente mensaje:
      "${message}"`,
    };
    sendEmail(email)
      .then(() => res.json({ message: 'Email sent' }))
      .catch(err => next(new HttpError('Error sending the message, please try again', 500)));
  }
);

module.exports = router;
