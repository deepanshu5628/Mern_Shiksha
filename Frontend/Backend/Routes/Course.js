const express=require("express");
// course controller input 
const {createCourse, updateCourse,getAllCourse,getCourseDetails}=require("../Controller/Course");
const {createSection,updateSection,deleteSection}=require("../Controller/Section");
const {createSubsection,deleteSubSection}=require("../Controller/Subsection");
// category controller input 
const{showAllCategory,createCategory,categoryPageDetails}=require("../Controller/Category");
// Rating and review controller
const {createRating,getAllRatings,getAverageRating}=require("../Controller/RatingAndReview");
// importing middlewares
const {islogedin, isInstructor, isAdmin, isStudent}=require("../Middlewares/AuthZ");
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
router.post("/deleteSubSection",islogedin,isInstructor,deleteSubSection)

// ------------------Course--------------------
// create a course (only instructor ):)
router.post("/createCourse",islogedin,isInstructor,createCourse);
// Update a course (only instructor ):)
router.post("/updateCourse",islogedin,isInstructor,updateCourse);
// get all registered courses
router.get("/getallcourses",getAllCourse);
// get course detail s
router.post("/getcoursedetails",getCourseDetails);

//----------------------------------------------------------- Category route -----------------------------------------------------------
router.post("/createcategory",islogedin,isAdmin,createCategory);
router.get("/showallcategories",showAllCategory);
router.post("/getCategoryPageDetails",categoryPageDetails);

//----------------------------------------------------------- ReviewAndRating route -----------------------------------------------------------
router.post("/createRating",islogedin,isStudent,createRating);
router.get("/getreviews",getAllRatings);
router.post("/getaveragerating",getAverageRating);

module.exports=router;