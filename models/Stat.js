const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  stat: String,
  date: { type: String, default: Date.now }
});

module.exports = mongoose.model('Stat', statSchema);
