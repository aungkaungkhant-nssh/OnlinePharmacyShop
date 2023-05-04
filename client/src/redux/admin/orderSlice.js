import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'

let initialState ={
    orders:[],
    status:"idle",
    error:null
}

const orderSlice = createSlice({
    name:"adminOrder",
    initialState,
    reducers:{
        resetOrderSlice(state,action){
            state.status = "idle";
            state.error = null;
        }
    },
    extraReducers(builder){
        //fetch order start
        builder.addCase(fetchOrderLists.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(fetchOrderLists.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.orders = action.payload;
        })
        builder.addCase(fetchOrderLists.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })

        //delete order start
        builder.addCase(deleteOrder.pending,(state,action)=>{
            state.status = "delete loading";
        })
        builder.addCase(deleteOrder.fulfilled,(state,action)=>{
            state.status = "Delete succeeded";
            state.orders = state.orders.filter((a)=>(a._id != action.payload._id));
        })
        builder.addCase(deleteOrder.rejected,(state,action)=>{
            state.status = "failed";
            state.err = action.payload;
        })
    }
})

export const fetchOrderLists = createAsyncThunk('adminOrder/fetchOrderLists',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    try{
        let res = await Axios.get('/api/admin/orders',{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            } 
        });
        return res.data.orders;
    }catch(err){
        throw rejectWithValue(err.response.data.message)
    }
})
export const deleteOrder = createAsyncThunk('adminOrder/deleteOrder',async(id,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}} = getState();

    try{
        let res = await Axios.delete(`/api/admin/orders/${id}`,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })
        return res.data.order
    }catch(err){
        throw rejectWithValue(err.message);
    }
})
export const {resetOrderSlice} = orderSlice.actions;
export default orderSlice.reducer;