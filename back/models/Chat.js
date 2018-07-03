var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  room: String,
  writter: {
    name: String
  },
  message: String,
  updated_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Chat', ChatSchema);