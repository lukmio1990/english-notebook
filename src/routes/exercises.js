const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/exercises', isAuthenticated, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' });
  res.render('exercises/exercises', { notes });
});

module.exports = router;
