import { apiconnector, axiosapiconnector } from "../apiconnector";
import { course, section, subsection } from "../apis";


// ------------------------------------course CRUD API's----------------------------------


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





// ----------------------------------------Section Crud Api's -----------------------------


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


// ----------------------------------------Sub Section Crud Api's -----------------------------


// ------------------------------creata SubSection------------------------------
export const createSubSection=async(data,token)=>{
  let result;
  try {
    result = await axiosapiconnector("POST", subsection.SUBSECTION_API_ADDSUBSECTION, data, {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    });
    return result.data;
  } catch (error) {
    console.log("error occured in Create Sub Section in coursedetailsAPI.jsx");
    return error;
  }
}

// ------------------------------Deltet SubSection------------------------------
export const DeleteSubSection=async(data,token)=>{
  let result;
  try {
    result = await apiconnector("POST", subsection.SUBSECTION_API_DELETESUBSECTION, data, {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    });
    return result;
  } catch (error) {
    console.log("error occured in Delete Sub Section in coursedetailsAPI.jsx");
    return error;
  }
}