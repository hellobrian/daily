const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
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
  count: {
    type: Number,
    default: 0
  }
  // streak: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'streak'
  // }
});

module.exports = mongoose.model('Goal', goalSchema);
