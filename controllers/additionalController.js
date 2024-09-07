const THEATRES = require('../models/theatreModel');
const USERS = require('../models/userModel');
const MOVIES = require('../models/moviesModel');
const { default: mongoose } = require('mongoose');


const getTheatrebyId = async (req, res) => {
    try {
        const { theatreId } = req.query;
        if (!theatreId) {
            return res.status(404).json({ message: "theatre is not found" })
        }
        const response = await THEATRES.findOne({ _id: theatreId });
        res.status(200).json({ theatre: response })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
        console.log(error);

    }
};
const getMoviebyId = async (req, res) => {
    try {
        const { movieDataId } = req.query;
        if (!movieDataId) {
            return res.status(404).json({ message: "movieId is not found" })
        }
        const response = await MOVIES.findById(movieDataId);
        if (!response) {
            return res.status(404).json({ message: "movie is not found" })
        }
        res.status(200).json({ movie: response });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
        console.log(error);
    }
};

const getShowtimeById = async (req, res) => {
    try {
        const { showId } = req.query;


        if (!showId) {
            return res.status(404).json({ message: "showId not find" });
        }
        const showTime = await THEATRES.aggregate([
            { $unwind: '$showtimes' },
            {
                $match: {
                    'showtimes._id': new mongoose.Types.ObjectId(showId)
                }
            },
            {
                $project: {
                    time: '$showtimes.time'
                }
            }
        ]);
        res.status(200).json({ message: showTime });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
        console.log(error);
    }
}


module.exports = { getTheatrebyId, getMoviebyId, getShowtimeById }