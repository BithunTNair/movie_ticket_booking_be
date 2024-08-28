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
    time:{
        type:String
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