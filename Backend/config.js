require("dotenv").config();
// connecting db
const mongoose=require("mongoose");
async function main(){
    await mongoose.connect(MONGODB_LINK);
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

module.exports={startdb,transporter};
