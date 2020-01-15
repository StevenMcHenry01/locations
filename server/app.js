// 3rd party imports
import express from 'express'
import bodyParser from 'body-parser'

// My imports
import placesRoutes from './routes/places-routes.js'

const app = express()

// ROUTES
app.use('/api/places', placesRoutes)

app.use((error, req, res, next)=> {
  // check if error has already been handled
  if (res.headerSent) {
    return next(error)
  }

  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error has occured!'})
})

app.listen(5000)