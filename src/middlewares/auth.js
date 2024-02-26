const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '')

    if (!token || token === undefined) {
      throw new Error('Invalid authorization')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findOne({
      _id: decoded.id,
    })

    if (!user) {
      throw new Error('Please login or register to have access')
    }

    req.user = user
    req.token = token
    req.session = token

    next()
  } catch (err) {
    res.status(400).json({
      status: 'Bad Request',
      error: err.message,
    })
  }
}
