const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: [true, 'Please input a name'],
  },
  password: {
    type: String,
    minLength: 8,
    required: [true, 'Please input a password'],
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please input a email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value)
      },
      message: 'Please provide a valid email address',
    },
  },
  NYSC_camp: {
    type: String,
    require: [true, 'It is important to include nysc camp'],
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
      //   required: true,
    },
    coordinates: [Number],
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
})

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

userSchema.pre(/^find/, function(next) {
  this.find({
    active: { $ne: false },
  })
  next()
})

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User
