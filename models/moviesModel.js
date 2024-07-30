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
    cast:{
        type:String 
    },
    poster:{
        type:String 
    },
    rating:{
        type:Number
    }
})

const movies= mongoose.model('movies',movieSchema);
module.exports=movies