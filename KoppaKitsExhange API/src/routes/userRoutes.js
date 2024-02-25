const express = require('express')
const {
  createMessages,
  getMessages,
} = require('../controllers/messageController')
const {
  signup,
  login,
  getUsers,
  getuserByCamp,
  forgetPassword,
  resetPassword,
  deleteAccount,
  logout,
} = require('../controllers/userController')
const { auth } = require('../middlewares/auth')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', auth, logout)

router.post('/forget-password', forgetPassword)

router.post('/reset-password/:resetToken', resetPassword)

router.delete('/delete/:userId', auth, deleteAccount)

router.get('/', auth, getUsers)

router.get('/camp', auth, getuserByCamp)

router
  .route('/:userId/messages')
  .post(auth, createMessages)
  .get(auth, getMessages)

io.on('connection', () => {
  console.log('socket.oi is connected')
})

module.exports = router
