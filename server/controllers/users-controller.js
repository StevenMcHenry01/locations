// 3rd Part Imports
import checkAPIs from 'express-validator'
const { validationResult } = checkAPIs

// My Imports
import HttpError from '../models/http-error.js'
import User from '../models/user-model.js'

// ~ CREATE
export const signupNewUser = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
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

  const createdUser = new User({
    name,
    email,
    password,
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C5103AQEFr6xIyCLGYA/profile-displayphoto-shrink_200_200/0?e=1585180800&v=beta&t=-229CTpOqSYzJWNmWGw2kzaJbnUYYYnHweuTocoIzrs',
    places: []
  })

  try {
    await createdUser.save()
  } catch (err) {
    new HttpError('Error creating new user.', 500)
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) })
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
  if (existingUser.password !== password) {
    return next(new HttpError('Incorrect Password', 401))
  }

  res.json({ message: 'Logged in successfully' })
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
