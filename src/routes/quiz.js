const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/quiz', isAuthenticated, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  const len = notes.length;
  let random = Math.floor(Math.random() * len);
  const note = await Note.findOne().skip(random);

  res.render('quiz/quiz', { note });
});

module.exports = router;


