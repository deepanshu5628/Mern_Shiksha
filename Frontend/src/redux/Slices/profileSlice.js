import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({
    name:"profile",
    initialState:{
        user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null,
        loading:false,
        image:localStorage.getItem("image")? JSON.parse(localStorage.getItem("image")):null,
    },
    reducers:{
        setUser(state,actions){
            state.user=actions.payload;
        },
        setLoading(state,actions){
            state.loading=actions.payload;
        },
        setImage(state,actions){
            state.image=actions.payload;
        }
    }
})

export const{setUser,setImage,setLoading}=profileSlice.actions;
export default profileSlice.reducer;