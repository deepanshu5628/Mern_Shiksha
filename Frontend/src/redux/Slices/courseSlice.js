import { createSlice } from "@reduxjs/toolkit";

const courseSlice=createSlice({
    name:"course",
    initialState:{
        step:localStorage.getItem("step")?JSON.parse(localStorage.getItem("step")):1,
        edit:localStorage.getItem("edit")? JSON.parse(localStorage.getItem("edit")):false,
        course:localStorage.getItem("course")?JSON.parse(localStorage.getItem("course")):null,
        instructorcourses:localStorage.getItem("instructorcourses")?JSON.parse(localStorage.getItem("course")):null,
        PaymentLoading:false
    },
    reducers:{
        setStep:(state,actions)=>{
            state.step=actions.payload
        },
        setEdit:(state,actions)=>{
            state.edit=actions.payload
        },
        setCourse:(state,actions)=>{
            state.course=actions.payload
        },
        setInstructorCourses:(state,actions)=>{
            state.instructorcourses=actions.payload;
        },
        setPaymentLoading:(state,actions)=>{
            state.PaymentLoading=actions.payload;
        }
    }
})


export const {setStep,setCourse,setEdit,setPaymentLoading,setInstructorCourses}=courseSlice.actions;
export default courseSlice.reducer;