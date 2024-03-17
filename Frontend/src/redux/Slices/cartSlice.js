import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        totalitems:localStorage.getItem("totalitems")? JSON.parse(localStorage.getItem("totalitems")):0,
        cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    },
    reducers:{
        // setotalitems
        setTotalItems(state,action){
            state.totalitems=action.payload;
        },
        // add to cart 
        addToCart(state,action){
            state.cart.push(action.payload);
        },
        // remove form cart 
        removeFromCart(state,action){
            return state.cart.filter((item)=>item._id !==action.payload);
        },
        // reset cart
        resetCart(state){
            state.totalitems=0;
        },
    }
})

export const {setTotalItems,addToCart,removeFromCart,resetCart}=cartSlice.actions;
export default cartSlice.reducer;