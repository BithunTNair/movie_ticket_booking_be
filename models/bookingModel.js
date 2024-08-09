const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    theatre: {
        type: mongoose.Types.ObjectId,
        ref: 'theatre'
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'movies'
    },
    bookedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    bookedOn:{
        type:Date,
        default:new Date()
    }
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking