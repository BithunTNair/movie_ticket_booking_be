const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    seatNumber: {
        type: String,
        required: true,
        index: true
    },
    isBooked: {
        type: Boolean,
        default: false,
        index: true
    },
    price: {
        type: Number,
        default: 100
    },
    bookedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        // required:true
    }
});


const showtimeSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        index: true
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'movies',
        required: true
    },
    seats: [seatSchema],
    time: {
        type: String,
        required: true
    }

});
showtimeSchema.index({ time: 1, movie: 1 });

const theatreSchema = mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'owners',
        required:true
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