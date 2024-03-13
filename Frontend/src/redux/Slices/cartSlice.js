import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        totalitems:0,
        cartt:[],
    },
    reducers:{
        // setotalitems
        setTotalItems(state,action){
            state.totalitems=action.payload;
        },
        // add to cart 
        addToCart(state,action){
            state.cartt.push(action.payload);
        },
        // remove form cart 
        removeFromCart(state,action){
            return state.cartt.filter((item)=>item._id !==action.payload);
        },
        // reset cart
        resetCart(state){
            state.totalitems=0;
        },
    }
})

export const {setTotalItems,addToCart,removeFromCart,resetCart}=cartSlice.actions;
export default cartSlice.reducer;