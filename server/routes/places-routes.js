// 3rd Party Imports
const express = require('express')
const checkAPIs = require('express-validator')
const { check } = checkAPIs

// My imports
const { fileUpload } = require('../middleware/file-upload.js')
const { checkAuth } = require('../middleware/check-auth.js')

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById
} = require('../controllers/places-controller.js')

const router = express.Router()

// ~ READ
router.get('/user/:uid', getPlacesByUserId)
router.get('/:pid', getPlaceById)

// ~ Middleware AUTH
router.use(checkAuth)

// ~ CREATE
router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  createPlace
)

// ~ UPDATE
router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  updatePlaceById
)

// ~ DELETE
router.delete('/:pid', deletePlaceById)

module.exports = router
