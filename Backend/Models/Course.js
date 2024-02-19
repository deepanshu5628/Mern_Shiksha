const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
    },
    courseDescription:{
        type:String,
        required:true,
    },
    Instructor:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    whatYouWillLearn:{
        type:String,
    },
    Price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    Category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
    },
    enrolledStudents:[{
        type:mongoose.Types.ObjectId,
        ref:"User",
    }],
    courseContent:[{
        type:mongoose.Types.ObjectId,
        ref:"Section",
    }],
    ratingAndReviews:[{
        type:mongoose.Types.ObjectId,
        ref:"RatingAndReview",
    }]
})

const Course=mongoose.model("Course",courseSchema);
module.exports=Course;