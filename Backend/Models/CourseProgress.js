const mongoose=require("mongoose");
const courseProgressSchema=new mongoose.Schema({
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"Course",
    },
    completedVideos:[{
        type:mongoose.Types.ObjectId,
        ref:"SubSection",
    }]
})

const CourseProgress=mongoose.model("CouseProgress",courseProgressSchema);
module.exports=CourseProgress;