// 3rd Part Imports
const { validationResult } = require('express-validator')
const getCoordsForAddress = require('../utils/location.js')
const mongoose = require('mongoose')
const fs = require('fs')

// My import
const HttpError = require('../models/http-error.js')
const Place = require('../models/place-model.js')
const User = require('../models/user-model.js')

// ~ CREATE
const createPlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs given', 422))
  }

  const { title, description, address } = req.body

  let coordinates
  try {
    coordinates = await getCoordsForAddress(address)
  } catch (error) {
    return next(error)
  }

  let createdPlace
  if (req.file && req.userData) {
    createdPlace = new Place({
      title,
      description,
      address,
      coordinates,
      image: req.file.path,
      creator: req.userData.userId
    })
  } else {
    return next(new HttpError('Error on backend.', 500))
  }

  // check if user exists
  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (err) {
    return next(new HttpError('Creating place failed, please try again.', 500))
  }

  if (!user) {
    return next(
      new HttpError('Could not find associated user for provided ID.', 404)
    )
  }

  try {
    // store place in db
    const session = await mongoose.startSession()
    session.startTransaction()
    await createdPlace.save({ session })

    // add place to user
    user.places.push(createdPlace)
    await user.save({ session })
    await session.commitTransaction()
  } catch (err) {
    return next(new HttpError('Creating place failed, please try again.', 500))
  }

  res.status(201).json({ place: createdPlace })
}

// ~ READ
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid
  let place
  try {
    place = await Place.findById(placeId)
  } catch (err) {
    return next(new HttpError('Error finding place.', 500))
  }

  // check if place was not found
  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id.', 404)
    )
  }

  // converts place to object and the id to a string
  res.json({ place: place.toObject({ getters: true }) })
}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid
  let places
  try {
    places = await Place.find({ creator: userId })
  } catch (err) {
    return next(new HttpError('Error finding places.', 500))
  }

  // error check
  if (!places) {
    return next(new HttpError('Could not find places for provided user.', 404))
  }

  res.json({ places: places.map(place => place.toObject({ getters: true })) })
}

// ~ UPDATE
const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    return next(new HttpError('Invalid inputs given', 422))
  }

  const { title, description } = req.body
  const placeId = req.params.pid

  let place
  try {
    place = await Place.findById(placeId)
  } catch (err) {
    return next(new HttpError('Error finding place.', 500))
  }

  // make sure correct user is editing their own place
  if (place.creator.toString() !== req.userData.userId) {
    return next(
      new HttpError('You are not authorized to edit this location.', 401)
    )
  }

  place.title = title
  place.description = description

  try {
    await place.save()
  } catch (err) {
    return next(new HttpError('Error updating place.', 500))
  }

  res.json({ place: place.toObject({ getters: true }) })
}

// ~ DELETE
const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid

  let place
  try {
    place = await Place.findById(placeId).populate('creator')
  } catch (err) {
    return next(new HttpError('Error finding place.', 500))
  }

  // make sure place exists
  if (!place) {
    return next(new HttpError('Could not find place for specified ID.', 404))
  }

  if (place.creator.id !== req.userData.userId) {
    return next(
      new HttpError('You are not authorized to delete this location.', 401)
    )
  }

  const imagePath = place.image

  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await place.remove({ session })
    place.creator.places.pull(place)
    await place.creator.save({ session })
    await session.commitTransaction()
  } catch (err) {
    return next(new HttpError('Error deleting place.', 500))
  }

  // delete image
  fs.unlink(imagePath, err => {
    console.log(err)
  })

  res.status(200).json({ message: 'Deleted place successfully' })
}

module.exports = {
  createPlace,
  getPlaceById,
  getPlacesByUserId,
  updatePlaceById,
  deletePlaceById
}
