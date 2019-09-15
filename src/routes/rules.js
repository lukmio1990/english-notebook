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

router.get('/rules/edit/:id', isAuthenticated, async (req, res) => {
  const rule = await Rule.findById(req.params.id);
  res.render('rules/edit-rule', { rule });
});

router.put('/rules/edit-rule/:id', isAuthenticated, async (req, res) => {
  const { title, rule } = req.body;
  await Rule.findByIdAndUpdate(req.params.id, { title, rule });
  req.flash('success_msg', 'Zmiany zostały zapisane');
  res.redirect('/rules');
});

router.delete('/rules/delete/:id', isAuthenticated, async (req, res) => {
  await Rule.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Notatka usunięta');
  res.redirect('/rules');
});

module.exports = router;
