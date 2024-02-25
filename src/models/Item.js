const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  images: [],
  shoe_size: {
    type: Number,
    // enum: ['small', 'medium', 'large', 'extra-large'],
  },
  clothing_size: {
    type: String,
    enum: ['small', 'medium', 'large', 'extra-large'],
  },
  wanted_shoe_size: {
    type: Number,
  },
  wanted_clothing_size: {
    type: String,
    enum: ['small', 'medium', 'large', 'extra-large'],
  },
  status: {
    type: String,
    enum: ['searching', 'pairing', 'paired'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: String,
  kit_type: String,
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
