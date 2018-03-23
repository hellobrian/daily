const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Enter a name for your goal - short and sweet!'
    },
    created: {
      type: Date,
      default: Date.now
    },
    archived: {
      type: Boolean,
      default: false
    },
    completedDates: [{ type: Date, default: Date.now }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

goalSchema.virtual('streakCurrent').get(function() {
  return this.completedDates.length;
});

module.exports = mongoose.model('Goal', goalSchema);
