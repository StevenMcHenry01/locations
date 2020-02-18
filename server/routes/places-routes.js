// 3rd Party Imports
import express from 'express'
import checkAPIs from 'express-validator'
const { check } = checkAPIs

// My Imports
import fileUpload from '../middleware/file-upload.js'
import checkAuth from '../middleware/check-auth.js'

import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById
} from '../controllers/places-controller.js'

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

export default router
