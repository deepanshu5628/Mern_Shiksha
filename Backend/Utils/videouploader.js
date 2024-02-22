 const cloudinary = require('cloudinary').v2;
async function videoUploader(file,foldername){
    try{
    let result=await cloudinary.uploader.upload(file.tempFilePath,{folder:foldername,quality:50,resource_type:"video"}); 
    return result;
} catch (error){
    return console.log(error);
    }
}

module.exports=videoUploader;