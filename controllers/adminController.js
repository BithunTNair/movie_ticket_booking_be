const MOVIES = require('../models/moviesModel');
const THEATRES = require('../models/theatreModel')
const cloudinary = require('cloudinary').v2

const upload = require('../middlewares/upload-middleware');
const { default: mongoose } = require('mongoose');
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
                title: title,
                description: description,
                genre: genre,
                director: director,
                rating: rating,
                poster: imageUrl
            }).save()
            res.status(200).json({ message: 'movie added successfully' })
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
};
const updateMovie = async (req, res) => {
    try {
        console.log('hitted');
        const { title, description, genre, director, rating } = req.body

        // const { id } = req.params.id;
        const movieData = await MOVIES.findById('66b397177fd326b1cdd8d49d');
        console.log(movieData);

        if (!movieData) {
            res.status(401).json({ message: "movie is not found" });
        } else {
            const updatedMovie = await MOVIES.findByIdAndUpdate('66b397177fd326b1cdd8d49d', { title, description, genre, director, rating }, { new: true });
            res.status(200).json({ message: "movie updated successfully", updatedMovie })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
}

const deleteMovie = async (req, res) => {
    try {
        // const { id } = req.params.id
        const movieData = await MOVIES.findById('66b397177fd326b1cdd8d49d');
        if (!movieData) {
            res.status(401).json({ message: "movie is not found" });
        } else {
            MOVIES.deleteOne({ _id: '66b397177fd326b1cdd8d49d' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
}

const addshows = () => {

};
const addSeats = (seats) => {
    try {
        const totalSeats = [];
        for (let i = 1; i <= seats; i++) {
            totalSeats.push({ seatNumber: `S${i}`, isBooked: false })
        };
        return totalSeats
    } catch (error) {
        console.log(error);

    }
};
const addTheatre = async (req, res) => {
    try {
        const { name, location, movie, seats } = req.body;
        if (!mongoose.Types.ObjectId.isValid(movie)) {
            return res.status(404).json({ message: "movieId is not found" })
        }
        if (!seats || seats <= 0) {
            return res.status(400).json({ message: "invalid seat number" })
        }
        const movieData = await MOVIES.findById(movie);
        if (!movieData) {
            return res.status(404).json({ message: "movie is not found" })
        } else {
            THEATRES({
                name: name,
                location: location,
                movie: movie,
                seats: addSeats(seats)
            }).save()
           res.status(200).json({ message: "theatre is successfully added" })
        }


    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
        console.log(error);

    }
};





module.exports = { addMovie, addshows, addTheatre, addSeats, deleteMovie, updateMovie }
