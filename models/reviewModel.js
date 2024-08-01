const mongoose = require('mongoose');

const reviewSchema= mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    theatre:{
        type:mongoose.Types.ObjectId,
        ref:'theatres'
    },
    review:{
        type:String,

    },
    rating:{
        type:Number,
        min:1,
        max:5
    }
});

const reviews = mongoose.model('reviews', reviewSchema);
module.exports = reviews