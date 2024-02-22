const express=require("express");
const {startdb,connectcloudianry}=require("./config");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const fileUpload=require("express-fileupload");
const app=express();
const port=process.env.PORT;

// starting of server 
app.listen(port,()=>{
    console.log("connected to port",port);
})
// connecting db 
startdb();
connectcloudianry();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// user routes
const userRoute=require("./Routes/User");
const courseRoute=require("./Routes/Course");
const profileRoute=require("./Routes/Profile");
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/Course",courseRoute);
app.use("/api/v1/profile",profileRoute);

