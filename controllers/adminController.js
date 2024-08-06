const MOVIES = require('../models/moviesModel');
const THEATRES = require('../models/theatreModel')
const cloudinary= require('cloudinary').v2

const upload = require('../middlewares/upload-middleware');
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRETE_KEY
 });
const addMovie = async (req, res) => {

    try {
        console.log('hitted');
        if (!req.file) {
            return res.send('file is not visible')
        }
      
        

        const img = await cloudinary.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'something went wrong' })
            }
            const imageUrl = result.url
            const { title, description, genre, director, rating } = req.body;

            MOVIES({
                title:title,
                description:description,
                genre:genre,
                director:director,
                rating:rating,
                poster: imageUrl
            }).save()
            res.status(200).json({ message: 'movie added successfully'})
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
};
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params.id;
        const movieData = await MOVIES.findbyId({ id: id });
        if (!movieData) {
            res.status(401).json({ message: "movie is not found" });
        } else {
            const updatedMovie = await MOVIES.findbyIdandUpdate(id, { title, description, genre, director, rating }, { new: true });
            res.status(200).json({ message: "movie updated successfully", updatedMovie })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params.id
        const movieData = await MOVIES.findbyId({ id: id });
        if (!movieData) {
            res.status(401).json({ message: "movie is not found" });
        } else {
            MOVIES.deleteOne({ id: id });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
}

const addshows = () => {

};

const addTheatre = (req, res) => {
    try {
        const { name, location, movie } = req.body;

        THEATRES({
            name: name,
            location: location,
            movie: movie
        }).save().then((response) => {
            res.status(200).json({ message: "Theatre was added successfully", response })
        })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
        console.log(error);

    }
};

const addSeats = () => {

};



module.exports = { addMovie, addshows, addTheatre, addSeats, deleteMovie, updateMovie }
