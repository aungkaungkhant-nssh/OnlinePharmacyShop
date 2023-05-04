import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from '../../config/Axios'
const initialState = {
    products:[],
    status:'idle',
    error:null,
    categories:[],
    totalPage:''
}


const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        resetProductsSlice:(state,action)=>{
            state.products = [];
            state.status = "idle";
            state.error = null;
            state.categories =[];
            state.totalPage ='';
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchProducts.pending,(state,action)=>{
                state.status = "loading"
            })
            .addCase(fetchProducts.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.products =action.payload.products;
                state.categories=action.payload.categories;
                state.totalPage =action.payload.totalPage;
                state.currentPage = action.payload.currentPage;
                
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                if(action.payload){
                    state.error = action.payload;
                    return;
                }
                state.error = action.error.message
            })

    }
})

export const fetchProducts = createAsyncThunk('products/fetchProducts',async(data,{rejectWithValue})=>{
    try{
        const res = await Axios.get(`/api/products?page=${data?.page || 1}&medicine=${data?.medicine || ''}&categoryId=${data?.categoryId || ''}`);
        return res.data;
    }catch(err){
        throw rejectWithValue(err.response.data.message)
    }
 
})
export const { resetProductsSlice } = productsSlice.actions

export default productsSlice.reducer;