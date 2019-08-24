const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const NoteSchema = new Schema({
  word: { type: String, required: true },
  translate: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: String }
});

module.exports = mongoose.model('Note', NoteSchema);
