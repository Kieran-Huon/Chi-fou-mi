const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  user1: { type: Object, default: null },
  user2: { type: Object, default: null },
  turn: { type: Array, default: [] },
});

module.exports = mongoose.model('matches', matchSchema);
