const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema({
  current: {
    type: Number,
    default: 0
  },
  best: {
    type: Number,
    default: 0
  },
  goals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'goal'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  },
  archived: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Streak', streakSchema);
