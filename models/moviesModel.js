const mongoose=require('mongoose')


const movieSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    genre:{
        type:String
    },
    director:{
        type:String 
    },
    poster:{
        type:String 
    },
    rating:{
        type:Number
    },
    createdOn:{
        type:Date,
        default:new Date()
    }
})

const movies= mongoose.model('movies',movieSchema);
module.exports=movies