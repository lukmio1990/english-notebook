const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/quiz', isAuthenticated, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  const len = notes.length;
  let random = Math.floor(Math.random() * len);
  const note = await Note.findOne({ user: req.user.id }).skip(random);

  res.render('quiz/quiz', { note });
});

router.post('/quiz', isAuthenticated, async (req, res) => {
  const { reply, id } = req.body;
  const rank = await Note.findById(id);

  if (reply === '1') {
    const number = (rank.correct += 1);
    await Note.findByIdAndUpdate(id, { correct: number });
  } else if (reply === '0') {
    const number = (rank.uncorrect += 1);
    await Note.findByIdAndUpdate(id, { uncorrect: number });
  }

  res.redirect('/quiz');
});

module.exports = router;
