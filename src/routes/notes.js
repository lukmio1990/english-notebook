const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');
const NoteController = require('../controllers/NoteController');

router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/new-note');
});

router.post(
  '/notes/new-note',
  NoteController.validate,
  NoteController.checkValidation,
  isAuthenticated,
  async (req, res) => {
    const { word, translate } = req.body;
    const newNote = new Note({ word, translate });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Dodano pomyślnie');
    res.redirect('/notes');
  }
);

router.get('/notes', isAuthenticated, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' });

  res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render('notes/edit-note', { note });
});

router.put(
  '/notes/edit-note/:id',
  NoteController.validate,
  NoteController.checkValidation,
  isAuthenticated,
  async (req, res) => {
    const { word, translate } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { word, translate });
    req.flash('success_msg', 'Zmiany zostały zapisane');
    res.redirect('/notes');
  }
);

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Słówko usunięte');
  res.redirect('/notes');
});

module.exports = router;
