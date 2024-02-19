const express=require("express");
const {startdb}=require("./config");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const app=express();
const port=process.env.PORT;

// starting of server 
app.listen(port,()=>{
    console.log("connected to port",port);
})
// connecting db 
startdb();

app.use(express.json());
app.use(cookieParser());

// user routes
const userroute=require("./Routes/User");
app.use("/api/v1/auth",userroute)

