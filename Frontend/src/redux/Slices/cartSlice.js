import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        totalitems:localStorage.getItem("totalitems")? JSON.parse(localStorage.getItem("totalitems")):0,
        cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
        totalprice:localStorage.getItem("totalprice")?JSON.parse(localStorage.getItem("totalprice")):0,
        
    },
    reducers:{
        // add to cart 
        addToCart(state,actions){
            let course=actions.payload;
            let index=state.cart.findIndex((item)=>item._id===course._id);
            if(index>=0){
                // course is already in the cart
                toast.error("Course is Already in the Cart");
                return 
            }
            // state.cart.push(actions.payload);
            state.cart.push(actions.payload);
            state.totalitems+=1;
            toast.success("item added")
            state.totalprice+=course.price;

            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("totalitems",JSON.stringify(state.totalitems));
            localStorage.setItem("totalprice",JSON.stringify(state.totalprice));
        },
        // remove form cart 
        removeFromCart(state,action){
            let course=action.payload
            const index = state.cart.findIndex((item) => item._id === course)
            state.totalitems-=1;
            state.totalprice-=state.cart[index].price;
            state.cart.splice(index, 1)
            // return state.cart.filter((item)=>item._id !==course);
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("totalitems",JSON.stringify(state.totalitems));
            localStorage.setItem("totalprice",JSON.stringify(state.totalprice));
            toast.success("Removed Successfully");
        },
        // reset cart
        resetCart(state){
            state.totalitems=0;
            state.cart=[];
            state.totalprice=0;

            // upldate local storage 
            localStorage.removeItem("cart");
            localStorage.removeItem("totalprice");
            localStorage.removeItem("totalitems");
        },
    }
})

export const {addToCart,removeFromCart,resetCart}=cartSlice.actions;
export default cartSlice.reducer;