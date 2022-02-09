import cloudinaryFramework from 'cloudinary'
import cloudinaryStorage from 'multer-storage-cloudinary'

const cloudinary = cloudinaryFramework.v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: 'images',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
})

module.exports = storage
