const mongoose = require('mongoose')

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
    seats:{
        type:Array
    }
});

const theatres = mongoose.model('theatres', theatreSchema);
module.exports = theatres