import { createSlice } from "@reduxjs/toolkit";

const ViewCourseSlice=createSlice({
    name:"viewCourse",
    initialState:{
        courseSectionData:[],
        courseEntireData:[],
        videokaurl:"",
    },
    reducers:{
        setcourseSectionData:(state,actions)=>{
            state.courseSectionData=actions.payload;
        },
        setcourseEntireData:(state,actions)=>{
            state.courseEntireData=actions.payload;
        },
        setvideokaurl:(state,actions)=>{
            state.videokaurl=actions.payload
        }
    }
})

export const {setcourseEntireData,setcourseSectionData,setvideokaurl}=ViewCourseSlice.actions;
export default ViewCourseSlice.reducer;