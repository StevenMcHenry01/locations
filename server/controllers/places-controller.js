// 3rd Part Imports
import checkAPIs from 'express-validator'
const { validationResult } = checkAPIs
import { getCoordsForAddress } from '../utils/location.js'
import mongoose from 'mongoose'
import fs from 'fs'

// My Imports
import HttpError from '../models/http-error.js'
import Place from '../models/place-model.js'
import User from '../models/user-model.js'

// ~ CREATE
export const createPlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs given', 422))
  }

  const { title, description, address, creator } = req.body

  let coordinates
  try {
    coordinates = await getCoordsForAddress(address)
  } catch (error) {
    return next(error)
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    coordinates,
    image: req.file.path,
    creator
  })

  // check if user exists
  let user
  try {
    user = await User.findById(creator)
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
export const getPlaceById = async (req, res, next) => {
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

export const getPlacesByUserId = async (req, res, next) => {
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
export const updatePlaceById = async (req, res, next) => {
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
export const deletePlaceById = async (req, res, next) => {
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
