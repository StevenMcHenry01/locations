// 3rd Party Imports
import express from 'express'
import checkAPIs from 'express-validator'
const { check } = checkAPIs

// My Imports
import {
  getAllUsers,
  signupNewUser,
  loginUser
} from '../controllers/users-controller.js'

const router = express.Router()

// ~ CREATE
router.post(
  '/signup',
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

export default router
