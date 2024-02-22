const User=require("../Models/User");
const Profile=require("../Models/Profile");

// update user's profile 
exports.updateProfile=async(req,res)=>{
    try {
        // fetch all details from body 
        let {gender,dob,about,contactNo}=req,body;
        // this needs to be verify ->
        let userid=req.user.id;
        // validate the details 
        if(!gender||!dob||!about||!contactNo){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // create the profile 
        let newProfile=await Profile.create({
            about:about,
            contactNo:contactNo,
            gender:gender,
            dob:dob,
        });
        // update this profiledetails's id in its parent's i.e User 
        let updateddetails=await User.findByIdAndUpdate(userid,{
            additionalInformation:newProfile._id,
        },{new:true});

        // send responce
        res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            updateddetails,
            newProfile,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in update prfile  controller in profile.js/contollers",
            data:error.message,
        });
    }
}

// delete a user's account 
exports.deleteAccount=async(req,res)=>{
    try {
        // fetch user id from requres body 
        let userId=req.user._id;
        let userdetails=User.findById(userId);
        // delete it from user model
        let deluserdetails=await User.findByIdAndDelete(userId);
        // delete user'id from the enroller course section -Pending
        // send responce
        res.status(200).json({
            success:true,
            message:"Acoount Deleted",
            deluserdetails,
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in deleteacooujt controller in profile.js/contollers",
            data:error.message,
        });
    }
}


// get all user details 
exports.getAllUserDetails=async(req,res)=>{
    try {
        // fetch data from req body 
        let userId=req.user.id;
        // getalluserdetails
        let userdetails=await User.findById(userId)
        .populate("Course","courseName")
        .populate("additionalInformation","gender","dob","contactNo","about");
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in create section controller",
            data:error.message,
        });
    }
}
