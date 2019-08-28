const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const RulesSchema = new Schema({
  title: { type: String, required: true },
  rule: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: String }
});

module.exports = mongoose.model('Rule', RulesSchema);
