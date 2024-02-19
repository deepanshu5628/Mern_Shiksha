const mongoose=require("mongoose");
const ratingAndReviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:Stirng,
        require,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require,
    }
})

const RatingAndReview=mongoose.model("RatingAndReview",ratingAndReviewSchema);
module.exports=RatingAndReview;