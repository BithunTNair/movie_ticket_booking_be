const REVIEWS = require('../models/reviewModel');
const MOVIES = require('../models/moviesModel');
const THEATRES = require('../models/theatreModel');
const theatres = require('../models/theatreModel');
const mongoose = require('mongoose')

const getTheatre = async (req, res) => {
    try {
        const theatres = await THEATRES.find();
        if (!theatres) {
            res.status(404).json({ message: "theatres are not found" })
        }
        res.status(200).json({ theatres: theatres });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
};

const getMovies = async (req, res) => {
    console.log('get movie hitted');


    try {
        const movies = await MOVIES.find();
        if (!movies) {
            res.status(404).json({ message: "movie is not found" })
        }
        res.status(200).json({ movies: movies });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
};

const getSeats = async (req, res) => {

    try {
        const { id } = req.params;
        const theatre = await THEATRES.findById(id);

        if (!theatre) {
            return res.status(404).json({ message: 'Theatre is not found' });
        }
        const seats = await theatre.seats;
        res.status(200).json({ seats: seats });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
};

const getSeatsbyShow = async (req, res) => {
    try {

        const { id } = req.params;
     

        if (!id) {
            return res.status(404).json({ message: "can not find shows" })
        }
        const movieSeats = await THEATRES.aggregate([
            { $unwind: "$showtimes" },
            {
                $match: {
                    "showtimes._id": new mongoose.Types.ObjectId(id)
                }
            },
            {
                $project: {
                    getseats: "$showtimes.seats"
                }
            }
        ]);
        res.status(200).json({ movieseats: movieSeats })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
        console.log(error);

    }
};
const getMoviebyshow = async (req, res) => {
    try {
        const { showId } = req.query;
    

        if (!showId) {
            return res.status(404).json({ message: "movie does not find" });
        }
        const movieforTheshow = await THEATRES.aggregate([
            { $unwind: '$showtimes' },
            {
                $match: {
                    'showtimes._id': new mongoose.Types.ObjectId(showId)
                }
            },
            {
                $project: {
                    movie: '$showtimes.movie'
                }
            }
        ]);
        res.status(200).json({ message: movieforTheshow });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
        console.log(error);

    }
}
const getAllShows = async (req, res) => {
    try {
        const { id } = req.params;
        const theatre = await THEATRES.findById(id);
        if (!theatre) {
            return res.status(404).json({ message: "theatre is not found" })
        }
        console.log(theatre);

        const showTimes = theatre.showtimes;
        res.status(200).json({ shows: showTimes })
    } catch (error) {
        console.log(error);

    }
}

const getShowsbyDate = async (req, res) => {
    try {

        const { showDate } = req.query;

        if (!showDate) {
            return res.status(404).json({ message: "Invalid date" })
        }
        const showdate = new Date(new Date(showDate).setUTCHours(0, 0, 0, 0))
        const shows = await THEATRES.aggregate([
            { $unwind: '$showtimes' },
            { $match: { "showtimes.date": showdate } },
            {
                $project: {
                    showTimes: "$showtimes"
                }
            }
        ]);
        console.log(shows);
        console.log(showdate);


        res.status(200).json({ shows: shows });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
}


module.exports = { getTheatre, getMovies, getSeats, getSeatsbyShow, getMoviebyshow, getAllShows, getShowsbyDate }