// 3rd party imports
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// my imports

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  imageUrl: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
})

// allows for faster queries
userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)
