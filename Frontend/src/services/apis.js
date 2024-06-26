// require("dotenv").config();
// const BASE_URL=process.env.REACT_APP_BASE_URL;
// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://shiksha-tvyc.onrender.com";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_URL_COURSE = BASE_URL + "/api/v1/Course";
const BASE_URL_AUTH = BASE_URL + "/api/v1/auth";
const BASE_URL_PROFILE = BASE_URL + "/api/v1/profile";
const BASE_URL_CONTACTUS = BASE_URL + "/api/v1/reach";
const BASE_URL_PAYMENT = BASE_URL + "/api/v1/payment";

// ----------------------------------coursese-----------------------------
// categoty api 's
export const categories = {
  CATEGORIES_API_SHOWALLCATEGORIES: BASE_URL_COURSE + "/showallcategories", //done
  CATEGORIES_API_CREATECATEGORY: BASE_URL_COURSE + "/createcategory",   //only admin from backend
  CATEGORIES_API_GETCATEGORYPAGEDETAILS:BASE_URL_COURSE + "/getCategoryPageDetails", //done
};

export const section = {
  SECTION_API_ADDSECTION: BASE_URL_COURSE + "/addsection",    //done
  SECTION_API_UPDATESECTION: BASE_URL_COURSE + "/updatesection",    // done
  SECTION_API_DELETESECTION: BASE_URL_COURSE + "/deletesection",    //DONE
};

export const subsection = {
  SUBSECTION_API_ADDSUBSECTION: BASE_URL_COURSE + "/addsubsection",  //done
  SUBSECTION_API_DELETESUBSECTION: BASE_URL_COURSE + "/deletesubsection",   //done
};

export const course = {
  COURSE_API_CREATECOURSE: BASE_URL_COURSE + "/createcourse",   //done
  COURSE_API_UPDATECOURSE: BASE_URL_COURSE + "/updatecourse",   //done
  COURSE_API_PUBLISHCOURSE: BASE_URL_COURSE + "/publishcourse",   //done
  COURSE_API_INSTRUCTORCOURSE: BASE_URL_COURSE + "/InstructorCourse",  //done
  COURSE_API_DELETECOURSE: BASE_URL_COURSE + "/deletecourse",    //done
  COURSE_API_GETALLCOURSE: BASE_URL_COURSE + "/getallcourses",   //done
  COURSE_API_GETCOURSEDETAILS: BASE_URL_COURSE + "/getcoursedetails",   //done
  COURSE_API_USERCOURSES:BASE_URL_COURSE+"/userCoursesDetails" ,      //done
};  

export const review = {
  COURSE_API_CREATERATING: BASE_URL_COURSE + "/createrating",    //done
  COURSE_API_GETREVIEW: BASE_URL_COURSE + "/getreviews",
  // COURSE_API_GETAVERAGERATING: BASE_URL_COURSE + "/getaveragerating",
};

// -----------------PROFILE-------------------------------
export const profile = {
  PROFILE_API_UPDATEDP: BASE_URL_PROFILE + "/updatedp", //done
  PROFILE_API_UPDATEPROFILE: BASE_URL_PROFILE + "/updateProfile", //done
  PROFILE_API_DELETEPROFILE: BASE_URL_PROFILE + "/deleteProfile",  //done
  PROFILE_API_GETUSERDETAILS: BASE_URL_PROFILE + "/getuserdetails", //done
};

// ---------------USER------------------------------------
export const user = {
  AUTH_API_LOGIN: BASE_URL_AUTH + "/login", //done
  AUTH_API_SIGNUP: BASE_URL_AUTH + "/signup", //done
  AUTH_API_SENDOTP: BASE_URL_AUTH + "/sendotp", //done
  AUTH_API_CHANGEPASSWORD: BASE_URL_AUTH + "/changepassword", //done
  AUTH_API_RESETPASSWORDTOKEN: BASE_URL_AUTH + "/resetpasswordtoken", //done
  AUTH_API_RESETPASSWORD: BASE_URL_AUTH + "/resetpassword", //done
};

// -------------------CONTACTT US _----------------
export const contactus = {
  CONTACTUS_API_CONTACT: BASE_URL_CONTACTUS + "/contact", //done
};

// -------------------Payment----------------
export const payment={
  PAYMENT_API_CREATEORDER:BASE_URL_PAYMENT+"/capturepayment" ,    //done
  PAYMENT_API_VERIFYPAYMENT:BASE_URL_PAYMENT+"/verifyPayment",    //done
  // SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL_PAYMENT + "/sendPaymentSuccessEmail",

}
