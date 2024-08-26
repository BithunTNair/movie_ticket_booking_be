const REVIEWS = require('../models/reviewModel');
const MOVIES = require('../models/moviesModel');
const THEATRES = require('../models/theatreModel');

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

const addReviews = (req, res) => {
    try {
        const { review, rating } = req.body;
        REVIEWS({
            review: review,
            rating: rating
        }).save().then((response) => {
            res.status(200).json({ message: "review added successfully", response })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: "something went wrong" })

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })

    }
};


const updateReviews = async (req, res) => {
    try {
        console.log('hitted');


        const { review, rating } = req.body;
        // const { id } = req.params.id;


        const Review = await REVIEWS.findById('66b48edfb25e900121cd44ef');


        if (!Review) {
            res.status(404).json({ message: "not found" })
        } else {
            const updatedReview = await REVIEWS.findByIdAndUpdate('66b48edfb25e900121cd44ef', { review, rating }, { new: true });
            res.status(200).json({ message: "review updated successfully", updatedReview })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })

    }
};


const deleteReviews = async (req, res) => {
    try {
        // const { id } = req.params.id;

        const Review = await REVIEWS.findById('66b48edfb25e900121cd44ef');


        if (!Review) {
            res.status(404).json({ message: "not found" })
        } else {
            const deleteReview = await REVIEWS.findByIdAndDelete('66b48edfb25e900121cd44ef');
            res.status(200).json({ message: "review deleted successfully" });
            console.log(Review);

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })

    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await REVIEWS.find();
        if (!reviews) {
            res.status(404).json({ message: "review is not found" })
        }
        res.status(200).json({ reviews: reviews });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
}

module.exports = { getTheatre, getMovies, getSeats, addReviews, updateReviews, deleteReviews, getReviews }