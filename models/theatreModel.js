const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    seatNumber: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
});


const showtimeSchema = mongoose.Schema({
    time: {
        type:Date,
        required:true
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'movies',
        required:true
    }
});

const theatreSchema = mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'movies'
    },
    seats: [seatSchema],
    showtimes: [showtimeSchema],
    createdOn: {
        type: Date,
        default: new Date()
    }
});

const theatres = mongoose.model('theatres', theatreSchema);
module.exports = theatres