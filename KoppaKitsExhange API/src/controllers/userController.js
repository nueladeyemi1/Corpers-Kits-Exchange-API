const User = require('../models/User')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../utils/email')
require('dotenv').config()

exports.signup = async (req, res) => {
  const user = await User.create(req.body)
  try {
    res.status(200).json({
      status: 'success',
      message: 'Your account has been created successfully',
      data: user,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('Password or Email not correct')
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    )

    res.status(200).json({
      status: 'success',
      message: 'You have successfully signed in',
      token,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }
}

exports.logout = async (req, res) => {
  try {
    // const user = await User.findOne({ email: req.user.email })

    req.session = null
    req.token = null

    res.status(200).json({
      status: 'success',
      message: 'You have successfully been logged out',
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }
}

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      throw new Error('User not found, please create a new account')
    }

    const resetToken = user.createPasswordResetToken()

    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/users/reset-password/${resetToken}`

    try {
      sendEmail(user.email, resetUrl)
    } catch (err) {
      user.passwordResetToken = undefined
      user.passwordResetTokenExpires = undefined

      await user.save({ validateBeforeSave: false })

      return next(err)
    }

    res.status(200).json({
      status: 'success',
      message: 'Your password link has been sent to your email address',
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.stack,
    })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex')

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    })

    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined

    await user.save()

    res.status(200).json({
      status: 'success',
      message: 'Password has been reset successfully',
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findById(userId)

    if (!user || req.user.email !== user.email) {
      throw new Error(`User does not exist`)
    }

    user.active = false

    await user.save()

    res.status(200).json({
      status: 'success',
      message: 'Your account has been deleted successfully.',
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password')

    res.status(200).json({
      status: 'success',
      length: users.length,
      data: users,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }
}

exports.getuserByCamp = async (req, res) => {
  try {
    const users = await User.find({
      NYSC_camp: req.user.NYSC_camp,
    }).select('-password')

    res.status(200).json({
      status: 'success',
      length: users.length,
      data: users,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }
}
