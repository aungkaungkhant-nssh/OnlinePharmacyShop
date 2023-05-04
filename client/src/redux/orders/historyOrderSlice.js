import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'
const initialState ={
    status:'idle',
    error:null,
    orders:[],
}

const historyOrderSlice = createSlice({
    name:"order",
    initialState,   
    reducers:{
        resetCreateOrderSlice(state,action){
            state.status='idle';
            state.error=null;
            state.orders=[];
        }
    },
    extraReducers(builder){
        builder.addCase(fetchOrdersHistory.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(fetchOrdersHistory.fulfilled,(state,action)=>{
            state.status ="succeeded";
            state.orders = action.payload
        })
        builder.addCase(fetchOrdersHistory.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })
    }
})

export const fetchOrdersHistory = createAsyncThunk('order/historyOrder',async(data,{getState,rejectWithValue})=>{
    const {auth:{authUser}} = getState();
    try{
        let res = await Axios.get('/api/order',{
            headers:{
                Authorization:`Bearer ${authUser.token}`
            }
        })
      
        return res.data.orders
    }catch(error){
        throw rejectWithValue(error.response.data.message);
    }
})

export default historyOrderSlice.reducer;