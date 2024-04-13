 const cloudinary = require('cloudinary').v2;
async function videoUploader(file,foldername){
    try{
    let result=await cloudinary.uploader.upload(file.tempFilePath,{folder:foldername,allowed_formats:['mp4',"mkv"],quality:50,resource_type:"video"}); 
    return result;
} catch (error){
     console.log(error);
     return error
    }
}

module.exports=videoUploader;