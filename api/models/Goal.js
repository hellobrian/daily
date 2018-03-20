const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a goal name'
  },
  archived: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Goal', goalSchema);
