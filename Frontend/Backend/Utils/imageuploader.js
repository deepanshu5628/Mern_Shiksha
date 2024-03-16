const cloudinary = require('cloudinary').v2;

async function imageUploader(file,foldername){
    try {
        let result=await cloudinary.uploader.upload(file.tempFilePath,{folder:foldername,allowed_formats:["jpg","png"]})
    return result;
    } catch (error) {
    return console.log(error);    
    }
}

module.exports=imageUploader;