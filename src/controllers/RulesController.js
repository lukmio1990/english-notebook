const { check, validationResult } = require('express-validator');

const Rule = require('../models/Rules');

exports.validate = [
  check('title')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Podaj tytuł'),
  check('rule')
    .isLength({ min: 1 })
    .trim()
    .withMessage('To pole nie może być puste')
];
exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('./rules/new-rule', {
      validated: req.body,
      errors: errors.mapped(),
      showLightbox: 'true'
    });
  }
  next();
};
