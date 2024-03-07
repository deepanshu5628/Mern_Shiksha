import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({
    name:"profile",
    initialState:{
        user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null,
        
    },
    reducers:{
        setUser(state,actions){
            state.user=actions.payload;
        }
    }
})

export const{setUser}=profileSlice.actions;
export default profileSlice.reducer;