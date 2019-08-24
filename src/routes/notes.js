const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

const { isAuthenticated } = require('../helpers/auth');

// router.get('/notes/add', isAuthenticated, (req, res) => {
//   res.render('notes/new-note');
// });

// router.post('/notes/new-note', isAuthenticated, async (req, res) => {
//   const { word, translate } = req.body;
//   const errors = [];
//   if (!word) {
//     errors.push({ text: 'Podaj tytuł notatki' });
//   }

//   if (!translate) {
//     errors.push({ text: 'Podaj treść notatki' });
//   }

//   if (errors.length > 0) {
//     res.render('notes/new-note', {
//       errors,
//       word,
//       translate
//     });
//   } else {
//     const newNote = new Note({ word, translate });
//     newNote.user = req.user.id;
//     await newNote.save();
//     res.redirect('/notes');
//   }
// });

router.get('/notes', isAuthenticated, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' });
  res.render('notes/all-notes', { notes });
});

// router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
//   const note = await Note.findById(req.params.id);
//   res.render('notes/edit-note', { note });
// });

// router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
//   const { title, description } = req.body;
//   await Note.findByIdAndUpdate(req.params.id, { title, description });
//   res.redirect('/notes');
// });

// router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
//   await Note.findByIdAndDelete(req.params.id);
//   res.redirect('/notes');
// });

module.exports = router;
