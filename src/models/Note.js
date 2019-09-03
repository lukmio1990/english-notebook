const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const NoteSchema = new Schema({
  word: { type: String, required: true },
  translate: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: String },
  correct: { type: Number, default: 0 },
  uncorrect: { type: Number, default: 0 }
});

module.exports = mongoose.model('Note', NoteSchema);
