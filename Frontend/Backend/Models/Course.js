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
        required:true,
    },
    whatYouWillLearn:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        required:true,
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
    }],
    status: {
		type: String,
        default:"Draft",
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
})

const Course=mongoose.model("Course",courseSchema);
module.exports=Course;