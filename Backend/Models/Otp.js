const mongoose=require("mongoose");
const otpSchmea=new mongoose.Schema({
    email:{
        type:String,
        require,
    },
    otp:{
        type:String,
        require,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },
})

const Otp=mongoose.model("Otp",otpSchmea);
module.exports=Otp;