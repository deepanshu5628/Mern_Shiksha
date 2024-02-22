 const cloudinary = require('cloudinary').v2;
async function videoUploader(file,foldername){
    try{
    let result=await cloudinary.uploader.upload(file.tempFilePath,{folder:foldername,allowed_formats:["mp4","mkv","mov"],quality:50}); 
    return result;
} catch (error) {
    return res.status(400).json({
        success:false,
        message:"error in videoupload file while uploading video ",
        data:error,
    })
}
}
module.exports=videoUploader;