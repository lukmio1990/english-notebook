const express = require('express');
const router = express.Router();
const Rule = require('../models/Rules');
const { isAuthenticated } = require('../helpers/auth');
const RuleController = require('../controllers/RulesController');

router.get('/rules/add', isAuthenticated, (req, res) => {
  res.render('rules/new-rule');
});

router.post(
  '/rules/new-rule',
  RuleController.validate,
  RuleController.checkValidation,
  isAuthenticated,
  async (req, res) => {
    const { title, rule } = req.body;
    const newRule = new Rule({ title, rule });
    newRule.user = req.user.id;
    await newRule.save();
    req.flash('success_msg', 'Notatka została dodana');
    res.redirect('/rules');
  }
);

router.get('/rules', isAuthenticated, async (req, res) => {
  const rules = await Rule.find({ user: req.user.id }).sort({ date: 'desc' });
  res.render('rules/all-rules', { rules });
});

module.exports = router;
