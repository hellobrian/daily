const mongoose = require('mongoose');
const isToday = require('date-fns/is_today');

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: 'Enter a title for your goal - short and sweet!'
    },
    createdAt: {
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
      default: 0
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

habitSchema.virtual('createdAtDateString').get(function() {
  return this.createdAt.toDateString();
});

module.exports = mongoose.model('Habit', habitSchema);
