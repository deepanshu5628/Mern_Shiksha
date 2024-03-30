require("dotenv").config();
// connecting db
const mongoose=require("mongoose");
async function main(){
    await mongoose.connect(process.env.MONGODB_LINK);
};

let startdb=()=>{
    main()
    .then(()=>console.log("connected to db "))
    .catch((error)=>{
        console.log("error in connecting to db ");
        console.log(error);
    })
}

// connecting nodemailer
const nodemailer=require("nodemailer");
const transporter=nodemailer.createTransport({
    host:process.env.NODEMAILER_HOST,
    auth:{
        user:process.env.NODEMAILER_USER,
        pass:process.env.NODEMAILER_PASS,
    }
})

// cloudinary
const cloudinary = require('cloudinary').v2;
let connectcloudianry=()=>{
  try {
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET,
      });
  } catch (error) {
    return res.status(400).json({
        success:false,
        message:"error in connecting cloudinary",
        data:error,
    })
  }
}
// connecting razorpay
const Razorpay=require("razorpay");
const instance=new Razorpay({
    key_id:process.env.RAZORPAYTEST_KEY_ID,
    key_secret:process.env.RAZORPAYTEST_KEY_SECRET,
})


module.exports={startdb,transporter,connectcloudianry,instance};
