const express = require('express')
const xss = require('xss-clean')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const hpp = require('hpp')
const compression = require('compression')

const itemRoutes = require('./src/routes/itemRoutes')
const userRoutes = require('./src/routes/userRoutes')

require('dotenv').config()
require('./DB.js')

process.on('uncaughtException', () => {
  process.exit(1)
})

// Cross platform API access

app.use(cors())
app.use('*', cors())

// Limit request from same API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  limit: 50, //Limits each IP to 50 requests per 15 minutes
  message: 'Too many requests from this IP, please try again in an hour',
  // standardHeaders: 'draft-7',
  // legacyHeaders: false,
})

app.use(helmet())

// Data Sanitization against XSS
app.use(xss())

// Limit request from same API
app.use(limiter)

// Data sanitization against noSQL query injection
app.use(mongoSanitize())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Whitelisting Specific Parameters
app.use(
  hpp({
    whitelist: ['limit', 'page'],
  })
)

app.use(compression())

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'application',
  })
})

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/items', itemRoutes)
// app.use('/api/v1/messages', messageRoutes)
const PORT = process.env.PORT

io.on('connection', () => {
  console.log('Socket.io is connected')
})

const server = http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})

const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT']

sigs.forEach((element) => {
  process.on(element, (err) => {
    console.log(err.message)
    server.close(() => {
      console.log('Process is stopped')
    })
  })
})

process.on('unhandledException', (err) => {
  console.log(err.message)

  server.close(() => {
    process.exit(1)
  })
})
