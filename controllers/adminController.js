const MOVIES = require('../models/moviesModel');

const cloudinaryInstance = require('../config/cloudinary');
const uploadMiddleware = require('../middlewares/upload-middleware')

const addMovie = async (req, res) => {
    try {
        console.log('hitted');
        console.log(process.env.CLOUDINARY_NAME);
        console.log(process.env.CLOUDINARY_API_KEY);
        console.log(process.env.CLOUDINARY_SECRETE_KEY);
        console.log(typeof process.env.CLOUDINARY_API_KEY)
        if (!req.file) {
            return res.send('file is not visible')
        }
        const img = await cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'something went wrong' })
            }
            const imageUrl = result.url
            const { title, description, genre, cast, rating } = req.body;

            const newMovies = new MOVIES({
                title: title,
                description: description,
                genre: genre,
                cast: cast,
                rating: rating,
                poster: imageUrl
            })
            const response = await newMovies.save()
            res.status(200).json({ message: 'movie added successfully', response })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { addMovie }
