const express=require("express");
const router=express.Router();

const {isAdmin,isInstructor,isStudent,islogedin}=require("../Middlewares/AuthZ");
const {updateProfile,deleteAccount,getAllUserDetails}=require("../Controller/Profile");

// -----------------------------------------------------Profile Route -------------------------------------------------------------------
router.post("/updateProfile",islogedin,updateProfile);
router.delete("/deleteProfile",islogedin,deleteAccount);
router.get("/getuserdetails",islogedin,getAllUserDetails);
module.exports=router;