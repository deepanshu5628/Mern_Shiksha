import { apiconnector, axiosapiconnector } from "../apiconnector";
import { course, section } from "../apis";

// -------------------------------Create Course ---------------------------------------
export const addCourseDetails = async (data, token) => {
  let result;
  try {
    result = await axiosapiconnector(
      "POST",
      course.COURSE_API_CREATECOURSE,
      data,
      {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      }
    );
    return result;
  } catch (error) {
    console.log("error occured");
    return error;
  }
};

// ------------------------------------------Update Course Details --------------------------
export const updateCourseDetails = async (data, token) => {
  let result;
  try {
    result = await axiosapiconnector(
      "POST",
      course.COURSE_API_UPDATECOURSE,
      data,
      {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      }
    );
    return result;
  } catch (error) {
    console.log(
      "error occured in updateCourse Details in coursedetailsAPI.jsx"
    );
    return error;
  }
};

// --------------------------------------------Get details of a specific course -------------------------
export const getcoursedetails = async (id) => {
  let result;
  try {
    result = await apiconnector("POST", course.COURSE_API_GETCOURSEDETAILS,{courseId:id})
    return result;
  } catch (error) {
    console.log("error occured in Create Section in coursedetailsAPI.jsx");
    return error;
  }
};

// --------------------------------------------Create A section -------------------------
export const createSection = async (data, token) => {
  let result;
  try {
    result = await apiconnector("POST", section.SECTION_API_ADDSECTION, data, {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    });
    return result;
  } catch (error) {
    console.log("error occured in Create Section in coursedetailsAPI.jsx");
    return error;
  }
};

// -------------------------------Update a section ----------------------------------------
export const updateSection = async (data, token) => {
  let result;
  try {
    result = await apiconnector("POST", section.SECTION_API_UPDATESECTION, data, {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    });
    return result;
  } catch (error) {
    console.log("error occured in Create Section in coursedetailsAPI.jsx");
    return error;
  }
};


// -------------------------------Delete a section ----------------------------------------
export const deleteSection = async (data, token) => {
  let result;
  try {
    result = await apiconnector("POST", section.SECTION_API_DELETESECTION, data, {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    });
    return result;
  } catch (error) {
    console.log("error occured in Create Section in coursedetailsAPI.jsx");
    return error;
  }
};