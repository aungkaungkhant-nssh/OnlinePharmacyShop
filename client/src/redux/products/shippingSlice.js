import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    shipping:localStorage.getItem("shipping") ? JSON.parse(localStorage.getItem("shipping")) :{}
   
}

const shippingSlice = createSlice({
    name:"shipping",
    initialState,
    reducers:{
        addShipping(state,action){
           state.shipping = action.payload;
           localStorage.setItem("shipping",JSON.stringify(action.payload));
        },
        addPaymentMethod(state,action){
            state.shipping = {...state.shipping,...action.payload};
            localStorage.setItem('shipping',JSON.stringify({...state.shipping}))
        }
    }
})
export const {addShipping,addPaymentMethod} = shippingSlice.actions;
export default shippingSlice.reducer;