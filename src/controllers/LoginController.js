const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//rules to validation

exports.validate = [
  check('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Podaj swój adres email'),

  check('password')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Podaj hasło')
];

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('./users/signin', {
      validated: req.body,
      errors: errors.mapped(),
      showLightbox: 'true'
    });
  }

  next();
};
