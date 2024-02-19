const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    accoutType:{
        type:{String},
        enum:["Admin","Instructor","Student"],
        required:true,
    },
    courses:[{
        type:mongoose.Types.ObjectId,
        ref:"Course",
    }],
    additionalInformation:{
        type:mongoose.Types.ObjectId,
        ref:"Profile",
    },
    image:{
        type:String,
        required:true,
    },
    courseProgress:{
        type:mongoose.Types.ObjectId,
        ref:"CourseProgress",
    }



})

const User=mongoose.model("User",userSchema);
module.exports=User;