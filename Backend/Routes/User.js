let {sendotp,signup,login}=require("../Controller/AuthN");
let {changePassword,resetPassword, resetPasswordtoken}=require("../Controller/Password");
const express=require("express");
const { islogedin, isStudent,isInstructor,isAdmin } = require("../Middlewares/AuthZ");
const router=express.Router();

router.post("/sendotp",sendotp);
router.post("/signup",signup);
router.post("/login",login);
router.post("/changepassword",islogedin,changePassword);
router.post("/resetpasswordtoken",resetPasswordtoken);
router.post("/resetpassword",resetPassword);


module.exports=router;
