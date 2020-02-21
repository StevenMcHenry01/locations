// 3rd Party Imports
const express = require('express')
const { check } = require('express-validator')

// My imports
const {
  getAllUsers,
  signupNewUser,
  loginUser
} = require('../controllers/users-controller.js')
const { fileUpload } = require('../middleware/file-upload.js')

const router = express.Router()

// ~ CREATE
router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  signupNewUser
)
router.post('/login', loginUser)

// ~ READ
router.get('/', getAllUsers)

// ~ UPDATE

// ~ DELETE

module.exports =router
