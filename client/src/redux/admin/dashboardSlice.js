import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'

let initialState ={
    status:"idle",
    error:null,
    dashboardData:{}
}
const dashboardSlice= createSlice({
    name:"dashboard",
    initialState,
    extraReducers(builder){
        builder.addCase(fetchDashboardData.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(fetchDashboardData.fulfilled,(state,action)=>{
            state.status ="succeeded";
            state.dashboardData = action.payload
        })
        .addCase(fetchDashboardData.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })
    }
})

export const fetchDashboardData = createAsyncThunk('dashboard/fetchDashboardData',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}} = getState();
    try{
        let res = await Axios.get(`/api/admin/dashboard`,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        });
        return res.data.dashboard;
    }catch(err){
        throw rejectWithValue(err.message);
    }
})

export default dashboardSlice.reducer;