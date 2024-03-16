const express=require("express");
const {startdb,connectcloudianry}=require("./config");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const fileUpload=require("express-fileupload");
const app=express();
const cors=require("cors");
const port=process.env.PORT;

// starting of server 
app.listen(port,()=>{
    console.log("connected to port",port);
})
// connecting db 
startdb();
connectcloudianry();

// using cors
app.use( 
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// user routes
const userRoute=require("./Routes/User");
// course route
const courseRoute=require("./Routes/Course");
// profile route
const profileRoute=require("./Routes/Profile");
// contact us route
const contactUsRoute=require("./Routes/Contact");
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/Course",courseRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/reach", contactUsRoute);

