const { default: mongoose } = require("mongoose");
const Category = require("../Models/Category");
const Course = require("../Models/Course");
const User = require("../Models/User");
const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
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
    // image validation's 
    if (thumbnail.size >= 500000) {
      return res.status(200).json({
        success: false,
        message: "file size shold be less then 500 kb",
      })
    }
    // console.log("file type is ",thumbnail.mimetype.split("/")[1]);
    // console.log("image details are ", thumbnail)
    if(thumbnail.mimetype.split("/")[0]!="image") {
      return res.status(200).json({
        success:false,
        message:'only image can be uploaded',
      })
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
    let updatedcourse = await Course.findById(newcourse._id)
      .populate("category")
      .populate("Instructor")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        }
      }).exec();
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
    ).populate("category")
      .populate("Instructor")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        }
      }).exec();

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
          { $pull: { course: { $eq: oldcoursedetails._id } } }
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

// -----------------------------------------publich course controller----------------------
exports.publishCourse = async (req, res) => {
  try {
    // console.log(req.body);/
    let { status, courseId, instructorId } = req.body
    // basic validation
    if (!status || !courseId || !instructorId) {
      return res.status(400).json({
        success: false,
        message: "fill in all the details",
      });
    }
    // verify the instructor
    let ins = await User.findById(instructorId);
    // console.log(ins);
    if (!ins.courses.some((id) => id == courseId)) {
      return res.status(400).json({
        success: false,
        message: "Ustaad tez na bni",
      });
    }

    let updatedcourse = await Course.findByIdAndUpdate(courseId, { status: status }, { new: true })
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
    // send responce
    res.status(200).json({
      success: true,
      message: "heelo g",
      updatedcourse,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in publish Course  controller",
      data: error.message,
    });
  }
}

// -----------------------------------------Instucrtor Course--------------------------------------- 
exports.instructorCourse = async (req, res) => {
  try {
    let instructorId = req.user.id;
    // perform validation
    if (!instructorId) {
      return res.status(400).json({
        success: false,
        message: "fill in all the details",
      })
    }
    // check if course id has a couse of  not
    let instructordetails = await User.findById(instructorId).populate("courses");
    if (!instructordetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid Instructor id ",
      });
    }
    if (instructordetails.courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Instructor Doesn't Have any Course Yet",
        coursedetail: instructordetails.courses
      });
    }
    // send responce
    res.status(200).json({
      success: true,
      message: "Course details are fetched successfully",
      coursedetail: instructordetails.courses
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in get Instructor Courses controller in course .js",
      data: error.message,
    });
  }
}

// -----------------------------------------Delete Course--------------------------------------- 
exports.deleteCourse = async (req, res) => {
  try {
    // fetch CourseId from the req ki body 
    let { courseId } = req.body;
    let { instructorId } = req.user.id;
    // fetch course details
    let coursedetails = await Course.findById(courseId);
    if (!coursedetails) {
      return res.status(400).json({
        success: false,
        message: "No Course Found ",
        data: error
      })
    }
    // console.log(coursedetails);
    // deltet this course objectid form the Instructor Schema
    try {
      let x1 = await User.findByIdAndUpdate(coursedetails.Instructor,
        { $pull: { courses: { $eq: coursedetails._id } } }
        , { new: true });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "error occured while deletring course objeect id from the Instructor Sechema ",
        data: error
      })
    }
    // delete the Course id from the Category Schema
    try {
      let x2 = await Category.findByIdAndUpdate(coursedetails.category, {
        $pull: { course: { $eq: courseId } }
      }, { new: true });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "error occured while deletring course Id from Category Sechema ",
        data: error
      })
    }
    // clean the enrolledStudents
    try {
      const enrolledStudents = coursedetails.enrolledStudents;
      for (const studentsId of enrolledStudents) {
        await User.findByIdAndUpdate(studentsId, {
          $pull: { courses: { $eq: courseId } }
        })
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "error occured while delteing Enrolled Students's ",
        data: error
      })
    }
    // clean the section and subsection
    try {
      const courseSection = coursedetails.courseContent;
      for (const sectionId of courseSection) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId);
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "error occured while delteing section and subsection's ",
        data: error
      })
    }
    // Delete the course
    await Course.findByIdAndDelete(courseId)
    // send respoce 
    res.status(200).json({
      success: true,
      message: "Course Deleted SuccessfullY",
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in Delete Course  controller",
      data: error.message,
    });
  }
}

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

// ----------------------------------------------get Details of a specific  ---------------------

exports.getCourseDetails = async (req, res) => {
  try {
    // console.log(req.body)
    // fetch data form body
    let { courseId } = req.body;
    // perform validation
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "fill in all the details",
      })
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

// --------------------------------get all courses of a specfic user
exports.userCoursesDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    // find all the courses with this user id 
    let coursedetails = await User.findById(userId).populate("courses");
    // console.log(coursedetails);
    // if no course found
    if (!coursedetails) {
      return res.status(200).json({
        success: true,
        message: "Empty Cart",
        coursedetails: [],
      })
    }
    // if course found 
    // send responce
    res.status(200).json({
      success: true,
      message: "All courses",
      coursedetails: coursedetails.courses
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error in user specific course detils in   controller in course .js",
      data: error.message,
    });
  }
}