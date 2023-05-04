import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'

let initialState ={
    status:"idle",
    adminUsers:[],
    error:null,
    validationErrors:[]
}
const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        resetAdminSlice(state,action){
            state.status = "idle";
            state.error= null;
            
        }
    },
    extraReducers(builder){
        //fetch Admin users
        builder.addCase(fetchAdminUserLists.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(fetchAdminUserLists.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.adminUsers = action.payload;
        })
        builder.addCase(fetchAdminUserLists.rejected,(state,action)=>{
            state.status = 'failed'
                if(action.payload){
                    state.error = action.payload;
                    return;
                }
                state.error = action.error.message
        })
        /// create Admin User
        builder.addCase(createAdmin.pending,(state,action)=>{
            state.status ="loading";
        })
        builder.addCase(createAdmin.fulfilled,(state,action)=>{
            state.status = "create succeeded"
        })
        builder.addCase(createAdmin.rejected,(state,action)=>{
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
        /// delete Admin User
        builder.addCase(deleteAdmin.pending,(state,action)=>{
            state.status = "delete loading";
        })
        builder.addCase(deleteAdmin.fulfilled,(state,action)=>{
            state.status = "Delete succeeded";
            state.adminUsers = state.adminUsers.filter((a)=>(a._id != action.payload._id));
        })
        builder.addCase(deleteAdmin.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload
        })
        /// update Admin Role
        builder.addCase(updateRole.pending,(state,action)=>{
            state.status = "update loading";
            
        })
        builder.addCase(updateRole.fulfilled,(state,action)=>{
            state.status = "Update succeeded";
            let updateAdmin = state.adminUsers.map((a)=>{
                if(a._id === action.payload._id){
                    a.role = action.payload.role;
                }
                return a;
            })
            state.adminUsers = updateAdmin;
        })
        builder.addCase(updateRole.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })
    }
})

export const fetchAdminUserLists = createAsyncThunk('admin/fetchAdminUserLists',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    try{
        let res = await Axios.get('/api/admin/admin-users',{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            } 
        });
        
        return res.data.adminUsers;
    }catch(err){
        throw rejectWithValue(err.response.data.message)
    }
})

export const createAdmin = createAsyncThunk('admin/createAdmin',async(data,{getState,rejectWithValue})=>{
    let {name,email,phone,password,role,userimage} = data;
    let formData = new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("password",password);
    formData.append("role",role);
    formData.append("userimage",userimage);
    const {adminAuth:{adminAuthUser}}=getState();
    try{
        let res = await Axios.post('/api/admin/admin-users',formData,{
            headers:{
                "Content-Type":"multipart/form-data",
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
export const deleteAdmin = createAsyncThunk('admin/deleteAdmin',async(id,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    try{
        let res = await Axios.delete(`/api/admin/admin-users/${id}`,{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        });
  
        return res.data.admin;
    }catch(err){
        throw rejectWithValue(err.message);
    }
})

export const updateRole = createAsyncThunk('admin/updateRole',async(data,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    try{
        let res = await Axios.put(`/api/admin/admin-users/${data._id}`,{role:data.role},{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })

        return res.data.admin;
    }catch(err){
        throw rejectWithValue(err.message);
    }
})
export const {resetAdminSlice} = adminSlice.actions;
export default adminSlice.reducer;