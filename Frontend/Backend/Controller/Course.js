const { default: mongoose } = require("mongoose");
const Category = require("../Models/Category");
const Course = require("../Models/Course");
const User = require("../Models/User");
const imageUploader = require("../Utils/imageuploader");
// -----------------------------------------create course controller----------------------
exports.createCourse = async (req, res) => {
  try {
    // fetch infor form request body
    let { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;
    // fetch thumbnail form req.files
    let thumbnail;
    try {
      thumbnail = req.files.thumbnail;
    } catch (error) {
      return res.status(400).json({
        success: false,
        messsage: "file is not present",
      });
    }
    // perform basic validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "fill in all the details",
      });
    }
    // check if the category is valid or not
    let isvalidCategory = await Category.findOne({ name: category });
    if (!isvalidCategory) {
      return res.status(400).json({
        success: false,
        message: "Category is not valid",
      });
    }
    // find the instructor objet id
    let instructorid = req.user.id;
    let instructordetails = await User.findById(instructorid);
    if (!instructordetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor details are not present",
      });
    }
    // now we have instructor id ass well convert this stringtype of id into mongoose.objectid
    // let userid=mongoose.Types.ObjectId(instructorid);

    // upload the image to cloudinary
    let uploadedimage;
    try {
      uploadedimage = await imageUploader(thumbnail, "coursethumbnail");
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "error occured while uploading thumbnail image to cloudinary ",
        data: error.message,
      });
    }
    // save the new couse to the db with all the details
    let newcourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      Instructor: instructordetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      thumbnail: uploadedimage.secure_url,
      category: isvalidCategory._id,
    });
    // update the coursedetails in the  user means in the user model there is a field of Course
    // that shows the courese that are created by that user
    let updateduser = await User.findByIdAndUpdate(
      { _id: instructorid },
      {
        $push: {
          courses: newcourse._id,
        },
      },
      { new: true }
    );
    // update this course in Category Schema
    let updatedCategory = await Category.findOneAndUpdate(
      { name: category },
      {
        $push: {
          course: newcourse._id,
        },
      },
      { new: true }
    );

    // fetch finalCourseDetails
    let updatedcourse = await Course.findById(newcourse._id).populate(
      "category"
    );
    // send respoce
    res.status(200).json({
      success: true,
      message: "successfully Created New Course",
      updatedcourse,
      updateduser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in createCourse  controller",
      data: error.message,
    });
  }
};

// -----------------------------------------Update course controller----------------------

exports.updateCourse = async (req, res) => {
  try {
    // console.log(req.body);
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      courseId,
    } = req.body;
    // perform basic validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "fill in all the details",
      });
    }
    // console.log(courseId);
    // fetch all the course details that are already in the db
    let oldcoursedetails = await Course.findById(courseId).populate("category");
    // console.log(oldcoursedetails);

    // check if the category is valid or not
    let isvalidCategory = await Category.findOne({ name: category });
    if (!isvalidCategory) {
      return res.status(400).json({
        success: false,
        message: "Category is not valid",
      });
    }
    //  find by course id and update
    let updatedcourse = await Course.findByIdAndUpdate(
      courseId,
      {
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        category: isvalidCategory._id,
      },
      { new: true }
    ).populate("category");

    // now if the place the category is changed then update them in the category schema
    try {
      if (oldcoursedetails.category.name != category) {
        let newcataegory = await Category.findOneAndUpdate(
          { name: category },
          {
            $push: {
              course: updatedcourse._id,
            },
          }
        );
        // console.log(oldcoursedetails.category.name);
        // console.log(oldcoursedetails._id);
        let deletedcategory = await Category.findOneAndUpdate(
          { name: oldcoursedetails.category.name },
          { $pull: { course:{$eq:oldcoursedetails._id}  } }
        );
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error occured while updateding the Categoreis",
        data: error,
      });
    }

    // send responce
    res.status(200).json({
      success: true,
      message: "update Successfull",
      updatedcourse,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in Update Course  controller",
      data: error.message,
    });
  }
};
// ----------------------------------------------get all course controller ---------------------
exports.getAllCourse = async (req, res) => {
  try {
    let allCourse = await Course.find({}).populate("Instructor", "firstName");
    // send respoce
    res.status(200).json({
      success: true,
      message: "all course details are ",
      data: allCourse,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in get all couse controller",
      data: error,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    // fetch data form body
    let { courseId } = req.body;
    // perform validation
    if (!courseId) {
    }
    // check if course id has a couse of  not
    let coursedetail = await Course.findById(courseId);
    if (!coursedetail) {
      return res.status(400).json({
        success: false,
        message: "Invalid course id ",
      });
    }
    let coursedetails = await Course.findById(courseId)
      .populate({
        path: "Instructor",
        populate: {
          path: "additionalInformation",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("ratingAndReviews")
      .exec();
    if (!coursedetails) {
      return res.status(400).json({
        success: false,
        message: "course detailas not found",
      });
    }
    // send responce
    res.status(200).json({
      success: true,
      message: "Course details are fetched successfully",
      coursedetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in get course details  controller in course .js",
      data: error.message,
    });
  }
};
