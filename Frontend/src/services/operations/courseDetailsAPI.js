import { apiconnector, axiosapiconnector } from "../apiconnector";
import {course} from "../apis"


// -------------------------------Create Course ---------------------------------------
export const addCourseDetails=async(data,token)=>{
    let result;
    try {
        result=await axiosapiconnector("POST",course.COURSE_API_CREATECOURSE,data,{
            "Content-Type":"multipart/form-data",
            "authorization":`Bearer ${token}`
        })
        return result;
    } catch (error) {
        console.log("error occured");
        return error
    }   
}
export const updateCourseDetails=async(data,token)=>{
    let result;
    try {
        result=await axiosapiconnector("POST",course.COURSE_API_UPDATECOURSE,data,{
            "Content-Type":"multipart/form-data",
            "authorization":`Bearer ${token}`
        })
        return result;
    } catch (error) {
        console.log("error occured");
        return error
    }
}