import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'

const initialState = {
    status:"idle",
    products:[],
    error:null,
    categories:[],
    validationErrors:[],
}

const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        resetProductsSlice(state,action){
            state.status = "idle";
            state.error= null;
          
        }
    },
    extraReducers(builder){
        builder.addCase(fetchProductsForAdminPannel.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(fetchProductsForAdminPannel.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.products =action.payload.products;
            state.categories = action.payload.categories;
        })
        .addCase(fetchProductsForAdminPannel.rejected,(state,action)=>{
            state.status = "failed";
            if(action.payload){
                state.error = action.payload;
                return;
            }
        })

        // create product
        .addCase(createProductForAdminPannel.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(createProductForAdminPannel.fulfilled,(state,action)=>{
            state.status = "create succeeded";
        })
        .addCase(createProductForAdminPannel.rejected,(state,action)=>{
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

        // delete product
        .addCase(deleteProductForAdminPannel.pending,(state,action)=>{
                state.status = "delete loading";
        })
        .addCase(deleteProductForAdminPannel.fulfilled,(state,action)=>{
                state.status = "Delete succeeded";
                state.products = state.products.filter((a)=>(a._id != action.payload._id));
        })
        .addCase(deleteProductForAdminPannel.rejected,(state,action)=>{
               state.status = "failed";
               state.error = action.payload
        })

        //update product
        .addCase(updateProductForAdminPannel.pending,(state,action)=>{
            state.status = "Update loading";
        })
        .addCase(updateProductForAdminPannel.fulfilled,(state,action)=>{
            state.status = "Update succeeded";
            let updateProduct = state.products.map((a)=>{
                if(a._id === action.payload._id){
                    a=action.payload;
                }
                return a;
            })
            state.products = updateProduct;
        })
        .addCase(updateProductForAdminPannel.rejected,(state,action)=>{
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

export const fetchProductsForAdminPannel = createAsyncThunk('products/fetchProductsForAdminPannel',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    try{
        const res = await Axios.get(`/api/admin/products`,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        });
        return res.data;
    }catch(err){
        throw rejectWithValue(err.response.data.message)
    }
})
export const createProductForAdminPannel = createAsyncThunk("products/createProductForAdminPannel",async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    
    try{
        const res = await Axios.post(`/api/admin/products`,data,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        });
        return res.data;
    }catch(err){
        let error = err.response.data;
        if(error.vErrors){
         throw rejectWithValue(error.vErrors.errors)
        }else{
         throw rejectWithValue(error.message)
        }
    }
})
export const deleteProductForAdminPannel = createAsyncThunk("products/deleteProductForAdminPannel",async(id,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState()
    try{
        const res = await Axios.delete(`/api/admin/products/${id}`,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })

        return res.data.product;
    }catch(err){
        throw rejectWithValue(err.response.data.message)
    }
})

export const updateProductForAdminPannel = createAsyncThunk("products/updateProductForAdminPannel",async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}= getState();
    
    try{
        const res = await Axios.put(`/api/admin/products/${data.id}`,data,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })
        return res.data.product;
    }catch(err){
        let error = err.response.data;
        if(error.vErrors){
         throw rejectWithValue(error.vErrors.errors)
        }else{
         throw rejectWithValue(error.message)
        }
    }
})
export const {resetProductsSlice} = productsSlice.actions;
export default productsSlice.reducer;

