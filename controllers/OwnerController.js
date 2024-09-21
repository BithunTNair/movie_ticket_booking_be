const THEATRES = require('../models/theatreModel');
const OWNERS = require('../models/theatreOwnerModel');


const addshows = async (req, res) => {
    try {
        const { id } = req.params;
        const { movieId, showtimeDate, seats, time } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid theatre ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(404).json({ message: "Invalid movie ID" });
        }
        const theatreData = await THEATRES.findById(id);
        if (!theatreData) {
            return res.status(404).json({ message: "theatre is not found" });
        }
        const movieData = await MOVIES.findById(movieId);
        if (!movieData) {
            return res.status(404).json({ message: "movie is not found" });
        }
        const newshowtime = { date: new Date(showtimeDate), time: time, movie: movieId, seats: addSeats(seats) };
        theatreData.showtimes.push(newshowtime);
        await theatreData.save();

        res.status(200).json({ message: "shows added successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
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

const getOwners = async (req, res) => {
    try {
        const response = await OWNERS.find();
        res.status(200).json({ owners: response})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
}

module.exports = { addshows, getOwners }