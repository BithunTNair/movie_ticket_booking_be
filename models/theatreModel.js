const mongoose = require('mongoose');

const seatSchema= mongoose.Schema({
    seatNumber:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
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
    createdOn: {
        type: Date,
        default: new Date()
    }
});

const theatres = mongoose.model('theatres', theatreSchema);
module.exports = theatres