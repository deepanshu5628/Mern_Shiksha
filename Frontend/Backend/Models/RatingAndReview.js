const mongoose=require("mongoose");
const ratingAndReviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
        default:1,
    },
    review:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course",
        required:true,
    }
})

const RatingAndReview=mongoose.model("RatingAndReview",ratingAndReviewSchema);
module.exports=RatingAndReview;