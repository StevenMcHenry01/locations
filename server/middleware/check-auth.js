// third party imports
const jwt = require('jsonwebtoken')

// my imports
const HttpError = require('../models/http-error.js')

const checkAuth = (req, res, next) => {
  // required for default browser behavior
  // allows for the browser to get to the other requests
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // Authorization: 'Bearer TOKEN' <-- only want the token
    if (!token) {
      throw new Error('Authentication failed.')
    }
    // validate token - error will jump to catch block
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    // add user data to each request
    req.userData = { userId: decodedToken.userId }
    next()
  } catch (err) {
    return next(new HttpError('Authentication failed.', 403))
  }
}

module.exports = {
  checkAuth
}
