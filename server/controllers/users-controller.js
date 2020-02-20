// 3rd Part Imports
import checkAPIs from 'express-validator'
const { validationResult } = checkAPIs
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// My Imports
import HttpError from '../models/http-error.js'
import User from '../models/user-model.js'

// ~ CREATE
export const signupNewUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs given', 422))
  }

  const { name, email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    return next(new HttpError('Error finding user', 500))
  }

  if (existingUser) {
    return next(
      new HttpError(
        'User already exists. Please signup with a new email address.',
        422
      )
    )
  }

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12) // encrypt with 12 salting rounds (sturdy)
  } catch (err) {
    return next(new HttpError('Could not create user. Please try again', 500))
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: []
  })

  try {
    await createdUser.save()
  } catch (err) {
    return next(new HttpError('Error creating new user.', 500))
  }

  // generate jwt
  let token
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email
      },
      'supersecret_secret',
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Error creating new user.', 500))
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token })
}

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    return next(new HttpError('Error finding user', 500))
  }

  if (!existingUser) {
    return next(new HttpError('No user found', 401))
  }

  // compare provided password to hashed pw in db
  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch (error) {
    return next(
      new HttpError('Error logging in. Please check provided credentials', 500)
    )
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials', 403))
  }

  // generate jwt
  let token
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email
      },
      'supersecret_secret',
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Error loggin in.', 500))
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token,
    message: 'Login Successful'
  })
}

// ~ READ
export const getAllUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find({}, '-password')
  } catch (err) {
    return next(new HttpError('Error fetching users.', 500))
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

// ~ UPDATE

// ~ DELETE
