// third party imports
import jwt from 'jsonwebtoken'

// my imports
import HttpError from '../models/http-error.js'

export default (req, res, next) => {
  // required for default browser behavior
  // allows for the browser to get to the other requests
  if(req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // Authorization: 'Bearer TOKEN' <-- only want the token
    if (!token) {
      throw new Error('Authentication failed.')
    }
    // validate token - error will jump to catch block
    const decodedToken = jwt.verify(token, 'supersecret_secret')
    // add user data to each request
    req.userData = {userId: decodedToken.userId}
    next()
  } catch (err) {
    return next(new HttpError('Authentication failed.', 403))
  }
}
