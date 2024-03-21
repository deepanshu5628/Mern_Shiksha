const Course = require("../Models/Course");
const Section = require("../Models/Section");

// ------------------------------create section controller----------------------------------
exports.createSection=async(req,res)=>{
    try {
        // fetch all the data form the body 
        let{sectionName,courseId}=req.body;
        // perform validation
        if(!sectionName||!courseId){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // vaidate if courseid is coorect or not 
        let coursedetails=await Course.findOne({_id:courseId});
        if(!coursedetails){
            return res.status(400).json({
                success:false,
                message:"invalid course id ",
            });
        };
        // create a new section
        let newSection=await Section.create({
            sectionName:sectionName,
        }); 
        // save this section in the course 
        let updatedcourse=await Course.findOneAndUpdate({_id:coursedetails},{$push:{courseContent:newSection._id}},{new:true}).populate("category").populate("courseContent").exec();
        // H.W use .populate bcz we are going to log the updatedcourse details 
        // send response 
        res.status(200).json({
            success:true,
            message:"section created Successfully",
            updatedcourse,
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in create section controller",
            data:error,
        });
    }
}

// ----------------------------------update Section controller----------------------------------
exports.updateSection=async(req,res)=>{
    try {
        // fetch data form body 
        let{sectionName,sectionId,courseId}=req.body;
        // validate 
        if(!sectionName||!sectionId){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // validate section id 
        let Sectiondetails=await Section.findOne({_id:sectionId});
        if(!Sectiondetails){
            return res.status(400).json({
                success:false,
                message:"Section id is not valid ",
            });
        }

        // find section and update 
        let updatedSection=await Section.findOneAndUpdate({_id:sectionId},{sectionName:sectionName},{new:true});
        

        // fetch the updated course details 
        let updatedcourse=await Course.findById(courseId).populate("category").populate("courseContent");
        // send responce
        res.status(200).json({
            success:true,
            message:"Successfully updated the section",
            updatedcourse,
        }) 
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in update section controller",
            data:error.message,
        });
    }
}

// ----------------------------------delete section----------------------------------
exports.deleteSection=async(req,res)=>{
    try {
        // fetch section id 
        let {sectionId,courseId}=req.body;
        // validate 
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // check if the sectionid is valid or not 
        let Sectiondetails=await Section.findOne({_id:sectionId});
        if(!Sectiondetails){
            return res.status(400).json({
                success:false,
                message:"Section id not valid ",
            });
        }
        // deltet the section from the db 
        let deletedSection=await Section.findOneAndDelete({_id:sectionId},{new:true});
        // delete the section the course as well 
        let updatedcourse=await Course.findByIdAndUpdate(courseId,{
            $pull:{courseContent:sectionId},
        },{new:true}).populate("category").populate("courseContent").exec();

        
        // send respoce 
        res.status(200).json({
            success:true,
            message:"Section has been deleted successfully",
            deletedSection,
            updatedcourse,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in Delete section controller",
            data:error.message,
        });
    }
}