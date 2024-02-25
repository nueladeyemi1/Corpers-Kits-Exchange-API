const Item = require('../models/Item')
const multer = require('multer')

// RETURNING BUFFER
// const multerstorage = multer.memoryStorage()

// HANDLING FILE

const multerstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/items')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + '--' + Math.round(Math.random() * 1e4) + file.originalname
    )
  },
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    throw new Error('Invalid file format')
  }
}

const upload = multer({
  storage: multerstorage,
  fileFilter: multerFilter,
})

exports.uploadKitsImages = upload.fields([{ name: 'images', maxCount: 8 }])

exports.createItem = async (req, res) => {
  try {
    const item = await Item.create({
      images: req.files.images,
      ...req.body,
      owner: req.user,
    })

    res.status(200).json({
      message: 'item submitted successfully',
      data: item,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getItemsByCamp = async (req, res) => {
  try {
    const items = await Item.find({}).populate('owner', 'NYSC_camp')

    const filteredItems = items.filter(
      (item) => item?.owner?.NYSC_camp === req.user?.NYSC_camp
    )

    res.status(200).json({
      status: 'success',
      length: filteredItems.length,
      data: filteredItems,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getItemsByStatus = async (req, res) => {
  try {
    const items = await Item.find({ status: req.body.status }).populate(
      'owner',
      'phoneNumber'
    )

    res.status(200).json({
      status: 'success',
      length: items.length,
      data: items,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
