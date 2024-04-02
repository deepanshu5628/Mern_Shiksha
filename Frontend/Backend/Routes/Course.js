const express=require("express");
// course controller input 
const {createCourse, publishCourse,updateCourse,deleteCourse,instructorCourse,getAllCourse,getCourseDetails,userCoursesDetails}=require("../Controller/Course");
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
// Delete a course (only instructor ):)
router.delete("/deleteCourse",islogedin,isInstructor,deleteCourse);
// Publish course (only instructor ):)
router.post("/publishCourse",islogedin,isInstructor,publishCourse);
// Course details of a specific Instructor (only instructor ):)
router.get("/InstructorCourse",islogedin,isInstructor,instructorCourse);

// get all registered courses
router.get("/getallcourses",getAllCourse);
// get course details
router.post("/getcoursedetails",getCourseDetails);
// GET CURRUSER COURSES 
router.get("/userCoursesDetails",islogedin,isStudent,userCoursesDetails);

//----------------------------------------------------------- Category route -----------------------------------------------------------
router.post("/createcategory",islogedin,isAdmin,createCategory);
router.get("/showallcategories",showAllCategory);
router.post("/getCategoryPageDetails",categoryPageDetails);

//----------------------------------------------------------- ReviewAndRating route -----------------------------------------------------------
router.post("/createRating",islogedin,isStudent,createRating);
router.get("/getreviews",getAllRatings);
// router.post("/getaveragerating",getAverageRating);

module.exports=router;