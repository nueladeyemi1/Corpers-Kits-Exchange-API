const express = require('express')
const Message = require('../models/Message')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

exports.createMessages = async (req, res) => {
  try {
    const messages = await Message.create({
      name: req.params.userId,
      ...req.body,
    })

    io.emit('message', messages)

    res.status(200).json({
      status: 'success',
      messages: messages,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      name: req.params.userId,
    }).populate()

    res.status(200).json({
      status: 'success',
      messages: messages,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
