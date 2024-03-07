import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null,
        signupData:localStorage.getItem("signupData")? JSON.parse(localStorage.getItem("signupdata")):null,
    },
    reducers:{
        setToken(state,actions){
            state.token=actions.payload;
        },
        setSignupData(state,actions){
            state.signupData=actions.payload;
        },
        setLoading(state,actions){
            state.loading=actions.payload;
        }
    }
})

export const {setToken,setSignupData,setLoading}=authSlice.actions;
export default authSlice.reducer;