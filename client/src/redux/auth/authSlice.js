import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'

const initialState ={
    authUser:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    loading:false,
    error:null,
    validationErrors:[],
    status:'',
    tokenUser:{}
}

const authSlice  = createSlice({
    name:"auth",
    initialState,
    reducers:{
        resetAuthSlice:(state,action)=>{
           state.error=null;
           state.loading=false;
           state.validationErrors=[];
           state.status = '';
           state.tokenUser={}
        },
        userLogout:(state,action)=>{
            localStorage.removeItem("userInfo");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("shipping");
            state.authUser=null;
            state.status="user logout success";
           
        }
    },
    extraReducers(builder){
        //userLogin
        builder.addCase(userLogin.pending,(state,action)=>{
            state.status ="loading"
            state.loading= true;
        })
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.status = "login success"
            state.loading = false;
            state.authUser = {...action.payload};
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        })
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.status ="failed"
            state.loading = false;
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
        //user Register
        builder.addCase(userRegister.pending,(state,action)=>{
            state.status ="loading"
            state.loading= true;
        })
        builder.addCase(userRegister.rejected,(state,action)=>{
            state.status ="failed"
            state.loading = false;
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
        builder.addCase(userRegister.fulfilled,(state,action)=>{
            state.status = "signup success";
            state.loading = false;
        })

        ///profile update
        builder.addCase(profileUpdate.pending,(state,action)=>{
            state.status = "loading";
            
        })
        
        builder.addCase(profileUpdate.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.authUser = {...action.payload};
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        })
        builder.addCase(profileUpdate.rejected,(state,action)=>{
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
        builder.addCase(passwordUpdate.pending,(state,action)=>{
            state.status="loading";
        })
        builder.addCase(passwordUpdate.fulfilled,(state,action)=>{
            state.status="succeeded";
        })
        builder.addCase(passwordUpdate.rejected,(state,action)=>{
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

        //resetPassword
        builder.addCase(resetPassword.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(resetPassword.fulfilled,(state,action)=>{
            state.status = "reset-password succeeded";
        })
        builder.addCase(resetPassword.rejected,(state,action)=>{
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

        /// getUserDataFromToken
        builder.addCase(getUserDataFromToken.pending,(state,action)=>{
            state.status= "token loading";
        })
        builder.addCase(getUserDataFromToken.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.tokenUser = action.payload;
        })
        builder.addCase(getUserDataFromToken.rejected,(state,action)=>{
            state.status="failed";
            state.error = action.payload;;
        })
        //newPassword
        builder.addCase(newPassword.pending,(state,action)=>{
            state.status = "newPassword loading";
        })
        builder.addCase(newPassword.fulfilled,(state,action)=>{
            state.status = "newPassword succeeded";
        })
        builder.addCase(newPassword.rejected,(state,action)=>{
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

export const userLogin = createAsyncThunk('auth/userLogin',async(data,{getState,rejectWithValue})=>{
   
    try{
        const res = await Axios.post('/api/auth/login',data);
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


export const userRegister = createAsyncThunk('auth/userRegister',async(data,{getState,rejectWithValue})=>{
    
    try{
        let res = await Axios.post('/api/auth/register',data)
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

export const profileUpdate =createAsyncThunk('auth/profileUpdate',async(data,{getState,rejectWithValue})=>{
    const {auth:{authUser}} = getState();
    
    try{
        let res = await Axios.put('/api/update/profile',data,{
            headers:{
                Authorization:`Bearer ${authUser.token}`
            }
        })
     
        return {...res.data.user,token:authUser.token};
    }catch(err){
        let error = err.response.data;
       if(error.vErrors){
        throw rejectWithValue(error.vErrors.errors)
       }else{
        throw rejectWithValue(error.message)
       }
    }
})
export const passwordUpdate = createAsyncThunk('auth/passwordUpdate',async(data,{getState,rejectWithValue})=>{
    const {auth:{authUser}} = getState();
    try{
        let res = await Axios.put('/api/update/password',data,{
            headers:{
                Authorization:`Bearer ${authUser.token}`
            }
        })
        return {...res.data.user,token:authUser.token};
    }catch(err){
        let error = err.response.data;
        if(error.vErrors){
         throw rejectWithValue(error.vErrors.errors)
        }else{
         throw rejectWithValue(error.message)
        }
    }
})
export const resetPassword = createAsyncThunk('auth/resetPassword',async(data,{getState,rejectWithValue})=>{
    try{
        let res = await Axios.post('/api/auth/reset-password',data);
        return res.data
    }catch(err){
        let error = err.response.data;
        if(error.vErrors){
         throw rejectWithValue(error.vErrors.errors)
        }else{
         throw rejectWithValue(error.message)
        }
    }
})
export const getUserDataFromToken = createAsyncThunk('auth/getUserDataFromToken',async(data,{getState,rejectWithValue})=>{
    try{
        let res = await Axios.get(`/api/auth/reset-password/${data.token}`);
        return res.data.user;
    }catch(err){
        throw rejectWithValue(err.response.data.message)
    }
})
export const newPassword = createAsyncThunk('auth/newPassword',async(data,{getState,rejectWithValue})=>{
    try{
        let res = await Axios.put('/api/auth/new-password',data);
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
export default authSlice.reducer;
export const { resetAuthSlice,userLogout } = authSlice.actions
