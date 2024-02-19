const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
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
    accountType:{
        type:String,
        enum:["Instructor","Student"],
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
        default:null,
        // require,
    },
    courseProgress:{
        type:mongoose.Types.ObjectId,
        ref:"CourseProgress",
    },
    resetToken:{
        type:String,
    },
    resetTokenTimer:{
        type:Date,
    }
})

const User=mongoose.model("User",userSchema);
module.exports=User;