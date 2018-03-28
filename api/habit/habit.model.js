const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
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
    completedDates: [{ type: Date, default: Date.now }],
    daysPerWeek: {
      type: Number,
      default: 3
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

habitSchema.virtual('streakCurrent').get(function() {
  return this.completedDates.length;
});

habitSchema.virtual('createdDateString').get(function() {
  return this.created.toDateString();
});

module.exports = mongoose.model('Habit', habitSchema);
