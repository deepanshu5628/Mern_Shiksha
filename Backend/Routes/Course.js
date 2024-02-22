const express=require("express");
// course controller input 
const {createCourse, getAllCourse}=require("../Controller/Course");
const {createSection,updateSection,deleteSection}=require("../Controller/Section");
const {createSubsection}=require("../Controller/Subsection");
// category controller input 
const{showAllCategory,createCategory}=require("../Controller/Category");
// importing middlewares
const {islogedin, isInstructor, isAdmin}=require("../Middlewares/AuthZ");
const router=express.Router();


//----------------------------------------------------------- course route -----------------------------------------------------------
// ----------------Section---------------
// add a new section to course 
router.post("/addSection",islogedin,isInstructor,createSection);
// update a section of a  course 
router.post("/updateSection",islogedin,isInstructor,updateSection);
// delete a section of a  course 
router.post("/deleteSection",islogedin,isInstructor,deleteSection);

// ----------------Sub Section---------------
// add a subsection to a section 
router.post("/addSubSection",islogedin,isInstructor,createSubsection)
// create a course (only instructor ):)
router.post("/createCourse",islogedin,isInstructor,createCourse);
// get all registered courses
router.get("/getallcourses",getAllCourse);

//----------------------------------------------------------- Category route -----------------------------------------------------------
router.post("/createcategory",islogedin,isAdmin,createCategory);
router.get("/showallcategories",showAllCategory);

module.exports=router;