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
    orderId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'failed'],
        default: 'pending'
    },
    bookedOn: {
        type: Date,
        default: new Date()
    },
    amount: {
        type: Number,
        required: true
    },
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking