import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({
    name:"profile",
    initialState:{
        user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null,
        loading:false,
    },
    reducers:{
        setUser(state,actions){
            state.user=actions.payload;
        },
        setLoading(state,actions){
            state.loading=actions.payload;
        }
    }
})

export const{setUser,setLoading}=profileSlice.actions;
export default profileSlice.reducer;