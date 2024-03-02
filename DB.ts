const mongoose = require('mongoose')
require('dotenv').config()

const DB_URL = process.env.DB_URL!.replace(
  '<password>',
  process.env.DB_PASSWORD!
)
const DB_NAME = process.env.DB_NAME!

mongoose
  .connect(DB_URL, {
    dbName: DB_NAME,
  })
  .then(() => {
    console.log('connected to database')
  })
  .catch((err: Error) => {
    console.log('Error connecting to DB', err)
  })
