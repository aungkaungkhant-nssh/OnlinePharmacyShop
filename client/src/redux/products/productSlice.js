import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'
const initialState ={
    product:{},
    status:"idle",
    error:null
}

const productSlice  = createSlice({
    name:"product",
    initialState,
    reducers:{
        resetProductSlice(state,action){
            state.status = "idle";
            state.error = null
        }
    },
    extraReducers(builder){
        builder.addCase(fetchProduct.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(fetchProduct.fulfilled,(state,action)=>{
            state.status ="succeeded";
            state.product = {...action.payload};
        })
        builder.addCase(fetchProduct.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.error.message
        })
        // add review product
        builder.addCase(addProductReview.pending,(state,action)=>{
            state.status="addProductReview loading";
        })
        builder.addCase(addProductReview.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.product={...action.payload}
        })
        builder.addCase(addProductReview.rejected,(state,action)=>{
            state.status = "failed";
            if(Array.isArray(action.payload)){
                state.validationErrors =  action.payload;
                return;
            }else if(action.payload){
                
                state.error = action.payload;
                return;
            }else{
                state.error = action.error.message;
            }
        })
    }    
})
export const fetchProduct = createAsyncThunk('product/fetchProduct',async(id,{getState,rejectWithValue})=>{
    try{
        const res = await Axios.get(`/api/products/${id}`);
        return res.data.product;
    }catch(err){
        throw rejectWithValue(err.response.data.message)
    }
   
})

export const addProductReview = createAsyncThunk('product/addProductReview',async(data,{getState,rejectWithValue})=>{
    const {auth:{authUser}}=getState();
    try{
        const res = await Axios.put(`/api/products/${data._id}/reviews`,data,{
            headers:{
                Authorization:`Bearer ${authUser.token}`
            }
        })
        return res.data.product
    }catch(err){
        let error = err.response.data;
        if(error.vErrors){
         throw rejectWithValue(error.vErrors.errors)
        }else{
         throw rejectWithValue(error.message)
        }
    }
})
export const {resetProductSlice} = productSlice.actions;
export default productSlice.reducer;
