import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'


let initialState ={
    status:"idle",
    error:null,
    validationErrors:[],
    categories:[]
}

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        resetCategorySlice(state,action){
            state.status = "idle";
            state.error = null;
        }
    },
    extraReducers(builder){
        builder.addCase(createCategory.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(createCategory.fulfilled,(state,action)=>{
            state.status = "created succeeded";
        })
        .addCase(createCategory.rejected,(state,action)=>{
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

        /// fetch categories
        .addCase(fetchCategories.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.status = "failed";
        })
        
        //delete category
        builder.addCase(deleteCategory.pending,(state,action)=>{
            state.status = "delete loading";
        })
        builder.addCase(deleteCategory.fulfilled,(state,action)=>{
         
            state.status="delete succeeded";
            state.categories = state.categories.filter((a)=>(a._id != action.payload._id));
        })
        builder.addCase(deleteCategory.rejected,(state,action)=>{
            state.status = "failed";
        })
    }
})


export const createCategory = createAsyncThunk('category/createCategory',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    try{
        let res = await Axios.post(`/api/admin/categories`,data,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })

        return res.data.categories;
    }catch(err){
        let error = err.response.data;
        if(error.vErrors){
         throw rejectWithValue(error.vErrors.errors)
        }else{
         throw rejectWithValue(error.message)
        }
    }
})
export const fetchCategories = createAsyncThunk('category/fetchCategories',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}} = getState();
    try{
        let res = await Axios.get('/api/admin/categories',{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })
        return res.data.categories;
    }catch(err){
        throw rejectWithValue(err.message);
    }
})
export const deleteCategory = createAsyncThunk('category/deleteCategories',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}} = getState();
    try{
        let res = await Axios.delete(`/api/admin/categories/${data.id}`,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        });
      
        return res.data.category;
    }catch(err){
        throw rejectWithValue(err.message);
    }
})
export const {resetCategorySlice} = categorySlice.actions;
export default categorySlice.reducer;