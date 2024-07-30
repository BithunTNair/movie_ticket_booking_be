const mongoose=require('mongoose')

const userSchema= mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:4,
        max:8
    },
    mobileNumber:{
        type:Number,
        // unique:true,
      
    },
    role:{
        type:Number,
        default:3
        // users  3,
        // theatre owners 2,
        // admin 1
    }
});

const users= mongoose.model('users',userSchema);
module.exports=users