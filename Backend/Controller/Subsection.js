const Section=require("../Models/Section");
const Subsection=require("../Models/SubSection");
const videoUploader=require("../Utils/videouploader");
exports.createSubsection=async(req,res)=>{
    try {
        // fetch info form the body
        let {title,description,timeDuration,sectionId}=req.body;
        // fetch file 
        let {videofile}=req.files;
        // perform validation's 
        if(!title||!description||!timeDuration||!sectionId||!videofile){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // check if the section id is valid or not 
        let sectiondetails=await Section.findOne({_id:sectionId});
        if(!sectiondetails){
            return res.status(400).json({
                success:false,
                message:"Invalid Section id ",
            });
        }
        // upload the video to the cloudinary 
        let result;
        try {
            result=await videoUploader(videofile,"sectionvideo");
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"error occured while uploading video to cloudinary ",
            });
        }
        // create A subsection
        let newSubsection=await Subsection.create({
            title:title,
            description:description,
            timeDuration,timeDuration,
            videoUrl:result.secure_url,
        })

        // save the newsubsection's id in it's parent i.e Section
        let updatedSectiondetails=await Section.findOneAndUpdate({_id:sectionId},{
            $push:{subSection:newSubsection._id}},
            {new:true,}  
            );

        // return the responce
        res.status(200).json({
            success:true,
            message:"New Subsection is created",
            updatedSectiondetails,
            newSubsection,
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in create section controller",
            data:error.message,
        });
    }
}
