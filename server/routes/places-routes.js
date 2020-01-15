// 3rd Party Imports
import express from 'express'

// My Imports
import {DUMMY_PLACES} from '../utils/dummy-data.js'
import HttpError from '../models/http-error.js'

const router = express.Router()

router.get('/user/:uid', (req, res, next)=> {
  const userId = req.params.uid
  const userPlaces = DUMMY_PLACES.filter(p=>p.creator === userId)

  // error check
  if(!userPlaces) {
    return next(new HttpError('Could not find place for provided user.', 404))
  }

  res.json({userPlaces})
})

/*
should be last route to ensure it is not being used unintentionally.
(Any route could be the :pid)
*/
router.get('/:pid', (req, res, next)=> {
  const placeId = req.params.pid
  const place = DUMMY_PLACES.find(p=>p.id === placeId)

  // error check
  if(!place) {
    return next(new HttpError('Could not find a place for the provided id.', 404))
  }

  res.json({place})
})


export default router