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
  console.log(req.body);
  const { reply, id } = req.body;
  const rank = await Note.findById(id);
  // console.log(rank);

  if (reply === '1') {
    // console.log('dobrze');
    const number = (rank.correct += 1);
    // console.log(rank.correct);

    await Note.findByIdAndUpdate(id, { correct: number });
    // console.log(await Note.find({ _id: id }));
  } else if (reply === '0') {
    // console.log('źle');
    const number = (rank.uncorrect += 1);
    // console.log(rank.uncorrect);

    await Note.findByIdAndUpdate(id, { uncorrect: number });
    // console.log(await Note.find({ _id: id }));
  }

  res.redirect('/quiz');
});

module.exports = router;
