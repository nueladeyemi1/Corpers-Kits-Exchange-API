const express = require('express')
const {
  uploadKitsImages,
  getItemsByCamp,
  createItem,
  getItemsByStatus,
} = require('../controllers/itemController')
const { auth } = require('../middlewares/auth.js')

const router = express.Router()

router.post('/', auth, uploadKitsImages, createItem)

router.get('/camp', auth, getItemsByCamp)

router.post('/status', auth, getItemsByStatus)

module.exports = router
