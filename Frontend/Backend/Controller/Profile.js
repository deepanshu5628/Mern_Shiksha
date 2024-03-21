const User = require("../Models/User");
const Profile = require("../Models/Profile");
const imageUploader = require("../Utils/imageuploader");

// ------------------------update user dp ---------------------
exports.updateDp = async (req, res) => {
  try {
    let image = req.files.image;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "image not found",
      });
    }
    // perform size validation's
    // upload it to cloudinary
    let uploadedimage;
    try {
      uploadedimage = await imageUploader(image, "userDp");
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "error while uploading image to cloudinary ",
        data: error,
      });
    }
    // save the secure url in the user db
    let updateduser = await User.findByIdAndUpdate(
      req.user.id,
      { image: uploadedimage.secure_url },
      { new: true }
    );
    // send responce
    res.status(200).json({
      success: true,
      message: "image uploadded successfully ",
      data: updateduser,
      imageurl: uploadedimage.secure_url,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in update prfile DP  controller in profile.js/contollers",
      data: error.message,
    });
  }
};

// --------------------------update user's profile ---------------------------
exports.updateProfile = async (req, res) => {
  try {
    // fetch all details from body
    let { gender, dob, about, contactNo, firstName, lastName } = req.body;
    // this needs to be verify ->
    let userid = req.user.id;
    // validate the details
    if (!gender || !dob || !about || !contactNo || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "fill in all the details",
      });
    }

    // token validatity
    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "invalid token",
      });
    }

    // check if the user already have some addition information
    let isaddinfo = await User.findById(userid);
    // if additional info doesn't exist
    if (isaddinfo.additionalInformation === null) {
      // create the profile
      let newProfile = await Profile.create({
        about: about,
        contactNo: contactNo,
        gender: gender,
        dob: dob,
      });
      // update this profiledetails's id in its parent's i.e User
      let updateddetails = await User.findByIdAndUpdate(
        userid,
        {
          additionalInformation: newProfile._id,
          firstName: firstName,
          lastName: lastName,
        },
        { new: true }
      );
    }
    // if addional info exist then in that case
    if (isaddinfo.additionalInformation !== null) {
      let addinfoid = isaddinfo.additionalInformation;
      let userupdate = await User.findByIdAndUpdate(userid, {
        firstName,
        lastName,
      });
      let addinfoupdate = await Profile.findByIdAndUpdate(addinfoid, {
        gender,
        dob,
        about,
        contactNo,
      });
    }

    let userfinaldetails = await User.findById(userid)
      .populate("additionalInformation")
      .exec();

    // send responce
    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      data: userfinaldetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in update prfile  controller in profile.js/contollers",
      data: error.message,
    });
  }
};

// ----------------------------------delete a user's account------------------------
exports.deleteAccount = async (req, res) => {
  try {
    // fetch user id from requres body
    let userId = req.user.id;
    let userdetails = await User.findById(userId);
    if (!userdetails) {
      return res.status(400).json({
        success: false,
        message: "user id is not valid ",
      });
    }
    // delete it from user model
    let deluserdetails = await User.findByIdAndDelete(userId);
    // deltet user profile
    let detuserprofile = await Profile.findByIdAndDelete(
      userdetails.additionalInformation
    );
    // delete user'id from the enroller course section -Pending
    // send responce
    res.status(200).json({
      success: true,
      message: "Acoount Deleted",
      deluserdetails,
      detuserprofile,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in deleteacooujt controller in profile.js/contollers",
      data: error.message,
    });
  }
};

// get all user details
exports.getAllUserDetails = async (req, res) => {
  try {
    // fetch data from req body
    let userId = req.user.id;
    // getalluserdetails
    let userdetails = await User.findById(userId).populate(
      "additionalInformation"
    );

    res.status(200).json({
      success: true,
      message: "here are all details ",
      userdetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in create section controller",
      data: error.message,
    });
  }
};
