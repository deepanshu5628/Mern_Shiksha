const Section=require("../Models/Section");
const Subsection=require("../Models/SubSection");
const videoUploader=require("../Utils/videouploader");
exports.createSubsection=async(req,res)=>{
    try {
        // fetch info form the body
        let {title,description,timeDuration,sectionId}=req.body;
        // fetch file 
        let {videoFile}=req.files;
        // validation of file size 
        if(videoFile.size> 5242880){
            return res.status(400).json({
                success:false,
                message:"Your video file has excedd the file size of 5mb ",
            });
        }
        // perform validation's 
        if(!title||!description||!timeDuration||!sectionId||!videoFile){
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
        try {
            result=await videoUploader(videoFile,"sectionvideo");
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"error occured while uploading video to cloudinary ",
                data:error.message,
            });
        }
        // create A subsection
        let subSectionDetails=await Subsection.create({
            title:title,
            description:description,
            timeDuration,timeDuration,
            videoUrl:result.secure_url,
        })

        // // save the newsubsection's id in it's parent i.e Section
        let updatedSection=await Section.findOneAndUpdate({_id:sectionId},{
            $push:{subSection:subSectionDetails._id}},
            {new:true,}  
            );
            // log poplulated section by using .populate
        // return the responce
        res.status(200).json({
            success:true,
            message:"New Subsection is created",
            subSectionDetails,
            updatedSection,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"error in create section controller",
            data:error.message,
        });
    }
}
