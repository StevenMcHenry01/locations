// 3rd party imports
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

// My imports
const placesRoutes = require('./routes/places-routes.js')
const usersRoutes = require('./routes/users-routes.js')
const HttpError = require('./models/http-error.js')

const app = express()

// ~ Mongoose Config
const connectUrl =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-clh7e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const connectConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

// ~ MiddleWare
// parse json data and return an object
app.use(bodyParser.json())

// allows backend to send static images from specified folder
app.use('/uploads/images', express.static(path.join('uploads', 'images')))

// CORS 🤮
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next()
})

// ~ Routes
app.use('/api/places', placesRoutes)
app.use('/api/users', usersRoutes)

// ~ Other
// wrong route error
app.use((req, res, next) => {
  const error = new HttpError('Could not find route', 404)
  throw error
})

// unhandled error default
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err)
    })
  }
  // check if error has already been handled
  if (res.headerSent) {
    return next(error)
  }

  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error has occured!' })
})

mongoose
  .connect(connectUrl, connectConfig)
  .then(() => {
    console.log(
      'Database successfully connected. \n'
    )
    app.listen(process.env.PORT || 5000)
  })
  .catch(err => console.log(err))
