import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'

let initialState = {
    status:"idle",
    error:null,
    lowerNumberInstockProductLists:[]
}

const lowerProductsSlice = createSlice({
    name:"lowerProducts",
    initialState,
    reducers:{
        resetLowerProductsSlice(state,action){
            state.status = "loading";
            state.error= null;
            
        }
    },
    extraReducers(builder){
        builder.addCase(fetchLowerNumberInstockProducts.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(fetchLowerNumberInstockProducts.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.lowerNumberInstockProductLists = action.payload;
        })
        .addCase(fetchLowerNumberInstockProducts.rejected,(state,action)=>{
            state.status="failed";
            state.error = action.payload;
        })
    }
})

export const fetchLowerNumberInstockProducts = createAsyncThunk("lowerProducts/fetchLowerNumberInstockProducts",async(date,{getState,rejectWitValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    try{
        let res = await Axios.get('/api/admin/products/lowerNumberInstock',{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })
        return res.data.product
    }catch(err){
        throw rejectWitValue(err.response.data.message)
    }
})
export const {resetLowerProductsSlice} = lowerProductsSlice.actions;
export default lowerProductsSlice.reducer;