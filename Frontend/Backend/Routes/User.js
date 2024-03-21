let {sendotp,signup,login}=require("../Controller/AuthN");
let {changePassword,resetPassword, resetPasswordtoken}=require("../Controller/Password");
const express=require("express");
const { islogedin, isStudent,isInstructor,isAdmin } = require("../Middlewares/AuthZ");
const router=express.Router();

// route for user login
router.post("/login",login);

// route for user signup 
router.post("/signup",signup);

// route for sendopt
router.post("/sendotp",sendotp);

// route for changing the password
router.post("/changepassword",islogedin,changePassword);

// reset password 

// route for generating a reset password token
router.post("/resetpasswordtoken",resetPasswordtoken);

// roue for reseting the password after verification 
router.post("/resetpassword",resetPassword);


module.exports=router;
