const { check, validationResult } = require('express-validator');

const Note = require('../models/Note');

exports.validate = [
  check('word')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Wpisz słówko lub zdanie'),

  check('translate')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Wpisz tłumaczenie')
];

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('./notes/new-note', {
      validated: req.body,
      errors: errors.mapped(),
      showLightbox: 'true'
    });
  }

  next();
};
