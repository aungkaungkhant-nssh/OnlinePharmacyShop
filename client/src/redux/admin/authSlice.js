import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../config/Axios";

let initialState ={
    adminAuthUser:localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null,
    status:"idle",
    error:null,
    validationErrors:[]
}

const adminAuthSlice = createSlice({
    name:"adminAuth",
    initialState,
    reducers:{
        resetAdminAuthSlice:(state,action)=>{
            state.error=null;
            state.validationErrors=[];
            state.status = 'idle'
         },
        adminLogout(state,action){
            localStorage.removeItem("adminInfo");
            state.adminAuthUser = null;
        }
    },
    extraReducers(builder){
        builder.addCase(adminLogin.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(adminLogin.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.adminAuthUser = action.payload;
            localStorage.setItem("adminInfo",JSON.stringify(action.payload));
        })
        builder.addCase(adminLogin.rejected,(state,action)=>{
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

        //admin profile update
        builder.addCase(adminProfileUpdate.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(adminProfileUpdate.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.adminAuthUser = {...action.payload};
            localStorage.setItem("adminInfo",JSON.stringify(action.payload))
        })
        builder.addCase(adminProfileUpdate.rejected,(state,action)=>{
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

        /// passwordUpdate
        builder.addCase(adminPasswordUpdate.pending,(state,action)=>{
            state.status="loading";
        })
        builder.addCase(adminPasswordUpdate.fulfilled,(state,action)=>{
            state.status="succeeded";
        })
        builder.addCase(adminPasswordUpdate.rejected,(state,action)=>{
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


export const adminLogin = createAsyncThunk('adminAuth/adminLogin',async(data,{getState,rejectWithValue})=>{
    try{
        let res = await Axios.post('/api/admin/auth/login',data);
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
export const adminProfileUpdate = createAsyncThunk('adminAuth/adminProfileUpdate',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    
    try{
        let res = await Axios.put("/api/admin/update/profile",data,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        });
        return {...res.data.admin,token:adminAuthUser.token};
    }catch(err){
        let error = err.response.data;
        if(error.vErrors){
         throw rejectWithValue(error.vErrors.errors)
        }else{
         throw rejectWithValue(error.message)
        }
     
    }
})

export const adminPasswordUpdate = createAsyncThunk('adminAuth/adminUpdatePassword',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    
    try{
    let res = await Axios.put("/api/admin/update/password",data,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        });
        return {...res.data.admin,token:adminAuthUser.token};
    }catch(err){
        let error = err.response.data;
        if(error.vErrors){
         throw rejectWithValue(error.vErrors.errors)
        }else{
         throw rejectWithValue(error.message)
        }
     
    }
})
export const {adminLogout,resetAdminAuthSlice} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;