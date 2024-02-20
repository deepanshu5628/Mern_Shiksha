const express=require("express");
// course controller input 
const {createCourse, getAllCourse}=require("../Controller/Course");
// category controller input 
const{showAllCategory,createCategory}=require("../Controller/Category");
// importing middlewares
const {islogedin, isInstructor, isAdmin}=require("../Middlewares/AuthZ");
const router=express.Router();


// course route
// create a course (only instructor ):)
router.post("/createCourse",islogedin,isInstructor,createCourse);
// get all registered courses
router.get("/getallcourses",getAllCourse);



// categoryies route
router.get("/showallcategories",showAllCategory);
router.post("/createcategory",islogedin,isAdmin,createCategory);

module.exports=router;