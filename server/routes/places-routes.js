// 3rd Party Imports
import express from 'express'
import checkAPIs from 'express-validator'
const { check } = checkAPIs

// My Imports
import fileUpload from '../middleware/file-upload.js'

import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById
} from '../controllers/places-controller.js'

const router = express.Router()

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

// ~ READ
router.get('/user/:uid', getPlacesByUserId)
router.get('/:pid', getPlaceById)

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

export default router
