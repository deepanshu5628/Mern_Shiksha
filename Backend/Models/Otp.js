const mailsender=require("../Utils/mailsender");
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
otpSchmea.post("save",(doc)=>{
    mailsender(doc.email,"Otp form Shiksha",doc.otp);
})
const Otp=mongoose.model("Otp",otpSchmea);
module.exports=Otp;