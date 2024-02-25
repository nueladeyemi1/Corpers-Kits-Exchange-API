const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const itemRoutes = require('./src/routes/itemRoutes')
const userRoutes = require('./src/routes/userRoutes')

require('dotenv').config()
require('./DB.js')

app.use(cors())
app.use('*', cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
