const cloudinary= require('cloudinary').v2

const cloudinaryInstance= cloudinary.config({ 
   cloud_name: process.env.CLOUDINARY_NAME, 
   api_key: process.env.CLOUDINARY_API_KEY, 
   api_secret: process.env.CLOUDINARY_SECRETE_KEY
});

module.exports= cloudinaryInstance