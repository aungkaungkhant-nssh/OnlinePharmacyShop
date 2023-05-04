import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'

let initialState ={
    status:"idle",
    users:[],
    error:null,
    validationErrors:[]
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        resetUserSlice(state,action){
            state.status = "idle";
            state.error= null;
           
        }
    },
    extraReducers(builder){
        builder.addCase(fetchUserLists.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(fetchUserLists.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.users = action.payload;
        })
        builder.addCase(fetchUserLists.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })

        ///add user
        builder.addCase(createUser.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(createUser.fulfilled,(state,action)=>{
            state.status = "create succeeded";
        })
        builder.addCase(createUser.rejected,(state,action)=>{
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

        /// delete user
        builder.addCase(deleteUser.pending,(state,action)=>{
            state.status = "delete loading";
        })
        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.status = "Delete succeeded";
            state.users = state.users.filter((a)=>(a._id != action.payload._id));
        })
        builder.addCase(deleteUser.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload
        })
    }
})

export const fetchUserLists = createAsyncThunk("user/fetchUserLists",async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState()
    try{
        let res = await Axios.get('/api/admin/users',{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        });
        return res.data.users;
    }catch(err){
        throw rejectWithValue(err.response.data.message)
    }
})

export const createUser = createAsyncThunk("user/createUser",async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}} = getState();
   
    try{
        let res = await Axios.post('/api/admin/users',data,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })
        return res.data.user;
    }catch(err){
        let error = err.response.data;
        if(error.vErrors){
         throw rejectWithValue(error.vErrors.errors)
        }else{
         throw rejectWithValue(error.message)
        }
    }
})
export const deleteUser = createAsyncThunk("user/deleteUser",async(id,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}} = getState();
    try{
        let res = await Axios.delete(`/api/admin/users/${id}`,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })
        return res.data.user
    }catch(err){
        throw rejectWithValue(err.message);
    }
})
export const {resetUserSlice} = userSlice.actions;
export default userSlice.reducer;