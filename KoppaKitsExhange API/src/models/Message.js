const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  message: String,
  time: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
