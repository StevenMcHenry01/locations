// 3rd party imports
import mongoose from 'mongoose'

// my imports

const Schema = mongoose.Schema

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

export default mongoose.model('Place', placeSchema)
