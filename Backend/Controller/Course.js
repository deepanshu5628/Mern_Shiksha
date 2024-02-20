const { default: mongoose } = require("mongoose");
const Category=require("../Models/Category");
const Course=require("../Models/Course");
const User=require("../Models/User");
const imageUploader=require("../Utils/imageuploader");
// create course controller
exports.createCourse=async(req,res)=>{
    try {
        // fetch infor form request body
        let {courseName,courseDescription,whatYouWillLearn,price,category}=req.body;
        
        // fetch thumbnail form req.files
        let thumbnail;
        try {
            thumbnail=req.files.thumbnail;
        } catch (error) {
            return res.status(400).json({
                success:false,
                messsage:"file is not present",
            })
        }
        // perform basic validation
        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!category||!thumbnail){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // check if the category is valid or not 
        let isvalidCategory=await Category.findOne({name:category});
        if(!isvalidCategory){
            return res.status(400).json({
                success:false,
                message:"Category is not valid",
            });
        }
        // find the instructor objet id 
        let instructorid=req.user.id;
        let instructordetails=await User.findById(instructorid);
        if(!instructordetails){
            return res.status(400).json({
                success:false,
                message:"Instructor details are not present",
            });
        }
        // now we have instructor id ass well convert this stringtype of id into mongoose.objectid
        // let userid=mongoose.Types.ObjectId(instructorid);
        console.log("yaha tak sab kokay");

        // upload the image to cloudinary 
        let uploadedimage;
        try {
            uploadedimage=await imageUploader(thumbnail,"coursethumbnail");
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"error occured while uploading thumbnail image to cloudinary ",
                data:error.message
            });
        }
        // save the new couse to the db with all the details 
        let newcourse=await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            Instructor:instructordetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            thumbnail:uploadedimage.secure_url,
            category:isvalidCategory._id,
        });
        // update the coursedetails in the  user means in the user model there is a field of Course
        // that shows the courese that are created by that user 
        let updateduser=await User.findByIdAndUpdate({_id:instructorid},{
            $push:{
                courses:newcourse._id,
            }
        },{new:true});
        // update this course in Category Schema
        let updatedCategory=await Category.findOneAndUpdate({name:category},{
            $push:{
                course:newcourse._id,
            },
        },{new:true},);
        // send respoce 
        res.status(200).json({
            success:true,
            message:"successfully Created New Course",
            newcourse,
            updateduser,
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in createCourse  controller",
            data:error,
        })
    }   
}

// get all course controller
exports.getAllCourse=async(req,res)=>{
    try {
        let allCourse=await Course.find({}).populate("Instructor","firstName");
        // send respoce 
        res.status(200).json({
            success:true,
            message:"all course details are ",
            data:allCourse,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in get all couse controller",
            data:error,
        })
    }   
}