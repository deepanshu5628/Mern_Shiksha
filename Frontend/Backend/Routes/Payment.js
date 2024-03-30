const { capturePayment ,verifyPayment} = require("../Controller/Payment");
const {islogedin,isStudent} =require("../Middlewares/AuthZ");
const express=require("express");
const router=express.Router();

router.post("/capturePayment",islogedin,isStudent,capturePayment);
router.post("/verifyPayment",islogedin,isStudent,verifyPayment);

module.exports=router;