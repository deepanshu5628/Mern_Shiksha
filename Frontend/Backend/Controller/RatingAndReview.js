const mongoose=require("mongoose");
const Course=require("../Models/Course");
const RatingAndReview = require("../Models/RatingAndReview");
// --------------------------------------------create a review ---------------------------------
exports.createRating=async(req,res)=>{
    try {
        // fetch data from requrest courseId,userId(req.user) rating review
        let {rating,review,courseId}=req.body;
        let userId=req.user.id;
        // perform validation of rating
        if(rating <=0 ||rating>5){
            return res.status(400).json({
                success:false,
                message:"rating should be in range of 1 to 5",
            });
        }
        // perform basic validation's 
        if(!rating||!review||!courseId||!userId){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // check if the course id is valid or not 
        let courseDetails=await Course.findById(courseId);
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"invalid course id ",
            });
        }
        // check if the user has alreaady written a review for that course of not
        let alreadyreviewed=await RatingAndReview.findOne({user:userId, course:courseId});
        if(alreadyreviewed){
            return res.status(400).json({
                success:false,
                message:"User have already cteated a Review",
            });
        }
        // if we are here then we have a valid course id 
        let newRating=await RatingAndReview.create({
            rating:rating,
            review:review,
            user:userId,
            course:courseId,
        })
        // review createed 
        // now we have to store this review in the course 
        let updatedcoursedetails=await Course.findByIdAndUpdate(courseDetails._id,{ratingAndReviews:newRating._id},{new:true});

        // send respocne
        res.status(200).json({
            success:true,
            message:"review created Sussessfully",
            newRating,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in create rating controller in rating and review.js",
            data:error.message,
        });
    }
}


// -------------------------------------     get all reviews  ---------------------------------
exports.getAllRatings=async(req,res)=>{
    try {
        // fetchall data
        let allratings;
        try {
         allratings=await RatingAndReview.find({}).sort({rating:"desc"})
        .populate("user","firstName lastName image")
        .populate("course","courseName").exec();
       } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error while fetching reviews",
            data:error.message
        })
       }
        
        // return respoce 
        res.status(200).json({
            success:true,
            message:"all review are fetched successfully",
            allratings,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in get all ratings controller in rating and review js file ",
            data:error.message,
        });
    }
}
// -------------------------------------     get average rating  ---------------------------------
// exports.getAverageRating=async(req,res)=>{
//     try {
//          //get course ID
//          const courseId = req.body.courseId;
//          //calculate avg rating 

//          const result = await RatingAndReview.aggregate([
//              {
//                  $match:{
//                      course: new mongoose.Types.ObjectId(courseId),
//                  },
//              },
//              {
//                  $group:{
//                      _id:null,
//                      averageRating: { $avg: "$rating"},
//                  }
//              }
//          ])

//          //return rating
//          if(result.length > 0) {

//              return res.status(200).json({
//                  success:true,
//                  averageRating: result[0].averageRating,
//              })

//          }
         
//          //if no rating/Review exist
//          return res.status(200).json({
//              success:true,
//              message:'Average Rating is 0, no ratings given till now',
//              averageRating:0,
//          })
//     } catch (error) {
//         return res.status(400).json({
//             success:false,
//             message:"error in get average reating controller in rating and review.js",
//             data:error.message,
//         });
//     }
// }
