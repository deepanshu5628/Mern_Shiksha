import { apiconnector, axiosapiconnector } from "../apiconnector";
import { course, review, section, subsection } from "../apis";


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

// -------------------------------Publish Course ---------------------------------------
export const publishCourse = async (data, token) => {

  let result;
  try {
    result = await apiconnector(
      "POST",
      course.COURSE_API_PUBLISHCOURSE,
      data,
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    );
    return result;
  } catch (error) {
    console.log("error occured");
    return error;
  }
}

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
  // console.log(id);
  let result;
  try {
    result = await apiconnector("POST", course.COURSE_API_GETCOURSEDETAILS, { courseId: id })
    return result;
  } catch (error) {
    console.log("error occured in Get Details of a specific Course in coursedetailsAPI.jsx");
    return error;
  }
};

// -------------------------------Delete Course ---------------------------------------
export const deleteCourse = async (id, token) => {
  try {
    let res = await apiconnector("DELETE", course.COURSE_API_DELETECOURSE, { courseId: id }, {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    })
    return res;
  } catch (error) {
    console.log("error occured in Delete Course in coursedetailsAPI.jsx");
    return error;
  }
}


// --------------------------------------------Get ALL cOURSES OF a instructor-------------------------
export const instructorCoursesdetails = async (token) => {
  let result;
  try {
    result = await apiconnector(
      "GET",
      course.COURSE_API_INSTRUCTORCOURSE, null,
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    );
    return result;
  } catch (error) {
    console.log("error occured");
    return error;
  }
}

// ------------------------------ Get Course of a loged in user -------------------------
export const userCourseDetails = async (token) => {
  let result;
  try {
    result = await apiconnector(
      "GET",
      course.COURSE_API_USERCOURSES, null,
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    );
    return result;
  } catch (error) {
    console.log("error occured");
    return error;
  }
}




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
export const createSubSection = async (data, token) => {
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
export const DeleteSubSection = async (data, token) => {
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


// ----------------------------------------Rating and Review Api's -----------------------------

export const CreateReview = async (data, token) => {
  let result;
  try {
    result = await apiconnector("POST", review.COURSE_API_CREATERATING, data, {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    });
    return result;
  } catch (error) {
    console.log("error occured in Create Review in coursedetailsAPI.jsx");
    return error;
  }
}

export const FetchReviews = async () => {
  let result;
  try {
    result = await apiconnector("GET", review.COURSE_API_GETREVIEW);
    return result;
  } catch (error) {
    console.log("error occured in Create Review in coursedetailsAPI.jsx");
    return error;
  }
}