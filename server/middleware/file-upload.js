const multer = require('multer')
const uuid = require('uuid/v1.js')

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const fileUpload = multer({
  limits: 500000, // limit image size to 500kb
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images')
    },
    filename: (req, file, cb) => {
      const extension = MIME_TYPE_MAP[file.mimetype]
      cb(null, uuid() + '.' + extension)
    }
  }),
  // confirm valid file upload
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype] // '!!' will convert undefined to false so isValid is always bool
    let error = isValid ? null : new Error('Invalid type!')
    cb(error, isValid)
  }
})

module.exports = { fileUpload }
