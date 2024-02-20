const cloudinary = require('cloudinary').v2;

async function imageUploader(file,foldername){
    try {
        let result=await cloudinary.uploader.upload(file.tempFilePath,{folder:foldername,allowed_formats:["jpg","png"]})
    return result;
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in imageuploader file while uploading image ",
            data:error,
        })
    }
}

module.exports=imageUploader;