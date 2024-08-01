const mongoose = require('mongoose');

const bookingSchema= mongoose.Schema({
    theatre:{
        type:mongoose.Types.ObjectId,
        ref:'theatre'
    }
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking