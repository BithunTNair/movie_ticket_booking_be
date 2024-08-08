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

      const movie=await  MOVIES({
                title: title,
                description: description,
                genre: genre,
                director: director,
                rating: rating,
                poster: imageUrl
            }).save();
            res.status(200).json({ message: 'movie added successfully',movie })
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
        const movieData = await MOVIES.findById('66b444b1f07a335f47020599');
        console.log(movieData);

        if (!movieData) {
            res.status(401).json({ message: "movie is not found" });
        } else {
            const updatedMovie = await MOVIES.findByIdAndUpdate('66b444b1f07a335f47020599', { title, description, genre, director, rating }, { new: true });
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

const addshows = async (req, res) => {
    try {
        const { theatreId, movieId, showtimeDate } = req.body;
        if (!mongoose.Types.ObjectId.isValid(theatreId)) {
            return res.status(404).json({ message: "Invalid theatre ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(404).json({ message: "Invalid movie ID" });
        }
        const theatreData = await THEATRES.findById(theatreId);
        if (!theatreData) {
            return res.status(404).json({ message: "theatre not found" });
        }
        const movieData = await MOVIES.findById(movieId);
        if (!movieData) {
            return res.status(404).json({ message: "movie not found" });
        }

        const newshowtime = { time: new Date(showtimeDate), movie: movieId };
        theatreData.showtimes.push(newshowtime);
        await theatreData.save()
        res.status(200).json({ message: "shows added successfully" })




    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
};

const deleteShows = async (req, res) => {
    try {
        const { theatreId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(theatreId)) {
            return res.status(404).json({ message: "Invalid theatre ID" });
        }
        const theatre = await THEATRES.findById(theatreId);
        if (!theatre) {
            return res.status(404).json({ message: "theatre not found" });
        }


        theatre.showtimes = []
        await theatre.save();
        return res.status(200).json({ message: "movie shows removed successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
}
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
            const theatre = await THEATRES({
                name: name,
                location: location,
                movie: movie,
                seats: addSeats(seats)
            }).save()
            res.status(200).json({ message: "theatre is successfully added", theatre })
        }


    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
        console.log(error);

    }
};





module.exports = { addMovie, addshows, deleteShows, addTheatre, addSeats, deleteMovie, updateMovie }
