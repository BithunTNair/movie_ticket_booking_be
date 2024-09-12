
const REVIEWS = require('../models/reviewModel');
const addReviews = (req, res) => {
    console.log('hitted');

    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "user id is not found" })
        }
        const { review, rating } = req.body;
        if (!review && !rating) {
            return res.status(404).json({ message: "Did not get inputs" })
        }

        REVIEWS({
            review: review,
            rating: rating,
            user: id

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

        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "id did not get" })
        }
        const { review, rating } = req.body;
        if (!review || !rating) {
            return res.status(404).json({ message: "did not get inputs" })
        }

        const Review = await REVIEWS.findById(id);


        if (!Review) {
            return res.status(404).json({ message: "not found" })
        } else {
            const updatedReview = await REVIEWS.findByIdAndUpdate(id, { review, rating }, { new: true });
            res.status(200).json({ message: "review updated successfully", updatedReview })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })

    }
};
const deleteReviews = async (req, res) => {
    try {
        const { id } = req.params;

        const Review = await REVIEWS.findById(id);


        if (!Review) {
            res.status(404).json({ message: "not found" })
        } else {
            const deleteReview = await REVIEWS.findByIdAndDelete(id);
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
        const reviews = await REVIEWS.find().populate('user', 'firstName lastName').exec();
        if (!reviews) {
            res.status(404).json({ message: "review is not found" })
        }
        res.status(200).json({ reviews: reviews });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" })
    }
}
module.exports = { getReviews, addReviews, updateReviews, deleteReviews }