const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//rules to validation

exports.validate = [
  check('name')
    .isLength({ min: 1, max: 30 })
    .trim()
    .withMessage('To pole nie może zostać puste!'),

  check('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Podaj swój adres email')
    .custom(async value => {
      const usr = await User.findOne({ email: value });
      if (usr) {
        throw new Error('Podany adres email już istnieje');
      }
      return true;
    }),
  check('password')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Podaj hasło')
    .custom((value, { req }) => {
      if (value !== req.body.confirm_password) {
        throw new Error('Hasła nie są identyczne');
      }
      return true;
    }),
  check('confirm_password').trim()
];

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('./users/signup', {
      validated: req.body,
      errors: errors.mapped(),
      showLightbox: 'true'
    });
  }

  next();
};
