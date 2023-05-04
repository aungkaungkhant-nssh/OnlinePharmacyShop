import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const initialState ={
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) :[],
    warning:null
}

const addToCartSlice  = createSlice({
    name:"addToCart",
    initialState,
    reducers:{
        resetCartItems(state,action){
            state.cartItems = [];
        },
        resetWarning(state,action){
            state.warning = null;
        },
        addCartItems(state,action){
            let existCartItem = state.cartItems.find((c)=>c._id == action.payload._id);
            if(existCartItem){
                existCartItem.qty +=Number(action.payload.qty);
            }else{
                state.cartItems.push({...action.payload});
            }
         
            localStorage.setItem("cartItems",JSON.stringify([...state.cartItems]))
        },
        cartItemQtyIncrease(state,action){
            let hasCartItem = state.cartItems.find((c)=>c._id == action.payload);
            if(hasCartItem){
                if(hasCartItem.numberInstock <=hasCartItem.qty){
                    state.warning = `Only ${hasCartItem.numberInstock} will be available`
                }else{
                    hasCartItem.qty +=1;
                    localStorage.setItem("cartItems",JSON.stringify([...state.cartItems]))
                }
              
            }
        },
        clearWarning(state,action){
            state.warning=null 
        },
        cartItemQtyDecrease(state,action){
            let hasCartItem = state.cartItems.find((c)=>c._id == action.payload);
            if(hasCartItem){
                if(hasCartItem.qty <=1){
                   return;
                }else{
                    hasCartItem.qty -=1;
                    localStorage.setItem("cartItems",JSON.stringify([...state.cartItems]))
                }
              
            }
        },
        cartItemDelete(state,action){
            let existCartItem = state.cartItems.filter((c)=>c._id !== action.payload);
            state.cartItems = existCartItem;
            localStorage.setItem("cartItems",JSON.stringify([...existCartItem]));
        }
    }  
})
export const {resetCartItems,resetWarning,addCartItems,cartItemQtyIncrease,clearWarning,cartItemQtyDecrease,cartItemDelete} = addToCartSlice.actions;

export default addToCartSlice.reducer;