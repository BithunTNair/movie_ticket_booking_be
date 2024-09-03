const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    theatre: {
        type: mongoose.Types.ObjectId,
        ref: 'theatre',
        required:true
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'movies',
        // required:true
    },
    bookedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required:true
    },
    // orderId: {
    //     type: String,
    //     required: true
    // },
    status: {
        type: Number,
        default: 1
        // 1 started,
        // 2 successfull ,
        // 3 failed
        // 4 refund
    },
    bookedOn: {
        type: Date,
        default: new Date()
    },
    totalAmount: {
        type: Number,
        required: true
    },
    showtimeId: {
        type:mongoose.Types.ObjectId,
        ref:'showtimes',
        required:true
        
    },
    seatNumbers:[String]
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking