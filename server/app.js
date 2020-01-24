// 3rd party imports
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// My imports
import placesRoutes from './routes/places-routes.js'
import usersRoutes from './routes/users-routes.js'
import HttpError from './models/http-error.js'

const app = express()

// ~ Mongoose Config
const connectUrl = 'mongodb+srv://Steven:Qt7bjZXDDSXQz84H@cluster0-clh7e.mongodb.net/locations?retryWrites=true&w=majority'

const connectConfig = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true 
}
 
// ~ MiddleWare
// parse json data and return an object
app.use(bodyParser.json())

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
    console.log('Database successfully connected. \n' + 'Listenening at http://localhost:5000' )
    app.listen(5000)
  })
  .catch(err => console.log(err))
