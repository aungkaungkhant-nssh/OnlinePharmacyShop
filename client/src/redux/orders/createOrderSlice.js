import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../config/Axios'

const initialState ={
    status:'idle',
    error:null,
    order:{},
    startOrder:localStorage.getItem("startOrder") ? JSON.parse(localStorage.getItem("startOrder")) :null
}
const createOrderSlice = createSlice({
    name:"order",
    initialState,   
    reducers:{
        resetCreateOrderSlice(state,action){
            state.status='idle';
            state.error=null;
        },
        startOrderItems(state,action){
            
            state.startOrder = [action.payload];
            localStorage.setItem("startOrder",JSON.stringify([action.payload]));
        }
    },
    extraReducers(builder){
        // create Order start
        builder.addCase(createOrder.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(createOrder.fulfilled,(state,action)=>{
            state.status = "success"
            state.order= action.payload;
            state.startOrder = null;
            localStorage.removeItem("cartItems");
            localStorage.removeItem("shipping");
            localStorage.removeItem("startOrder");
        })
        builder.addCase(createOrder.rejected,(state,action)=>{
            state.status = "fail"
            state.error = action.payload;
        })
        // create Order end
        //detail Order start
        builder.addCase(detailOrder.pending,(state,action)=>{
            state.status ="loading";
        })
        builder.addCase(detailOrder.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.order= {...action.payload};
        })
        builder.addCase(detailOrder.rejected,(state,action)=>{
            state.status = "failed"
            state.error = action.payload;
        })
        //detail Order end
        //paymentOrder start
        builder.addCase(paymentOrder.pending,(state,action)=>{
            state.status ="loading";
        })
        builder.addCase(paymentOrder.fulfilled,(state,action)=>{
            state.status="payment succeeded";
            state.order = action.payload;
        })
        builder.addCase(paymentOrder.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload
        })
        // //paymentOrder end
        // deliveredOrder start
        builder.addCase(deliveredOrder.pending,(state,action)=>{
            state.status = "loading";
        })
        builder.addCase(deliveredOrder.fulfilled,(state,action)=>{
            state.status = "delivered succeeded";
            state.order = action.payload;
        })
        builder.addCase(deliveredOrder.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })
    }
})


export const createOrder = createAsyncThunk('order/createOrder',async(order,{getState,rejectWithValue})=>{
      const {auth:{authUser}}=getState();
    try{
       let res = await Axios.post('/api/order',order,{
            headers:{
                Authorization:`Bearer ${authUser.token}`
            }
        })

        return res.data.order
    }catch(err){
        throw rejectWithValue(err.response.data.message)
    }
})
export const detailOrder = createAsyncThunk('order/detailOrder',async(data,{getState,rejectWithValue})=>{
    let token;
    const {adminAuth:{adminAuthUser}}=getState();
    const {auth:{authUser}} = getState();
    if(data.isAdminShow){
        token = adminAuthUser.token
    }else{
        token = authUser.token;
    }
   
    try{
        let res;
        if(data.isAdminShow){
            res = await Axios.get(`/api/admin/orders/${data.id}`,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
        }else{
             res = await Axios.get(`/api/order/${data.id}`,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
        }
        
        return res.data.order;
    }catch(error){
        throw rejectWithValue(error.response.data.message);
    }
})
export const paymentOrder = createAsyncThunk('order/paymentOrder',async(id,{getState,rejectWithValue})=>{
    const {auth:{authUser}} = getState();
    try{
        let res =await Axios.put(`/api/order/${id}`,{},{
            headers:{
                Authorization : `Bearer ${authUser.token}`
            }
        })
      
        return res.data.order;
    }catch(error){
        throw rejectWithValue(error.response.data.message);
    }
})

export const deliveredOrder = createAsyncThunk('order/deliveredOrder',async(id,{getState,rejectWithValue})=>{
    const {adminAuth:{adminAuthUser}}=getState();
    try{
        let res = await Axios.put(`/api/admin/orders/${id}`,{},{
            headers:{
                Authorization:`Bearer ${adminAuthUser.token}`
            }
        })
        return res.data.order;
    }catch(err){
        throw rejectWithValue(err.response.data.message);
    }
})
export const {resetCreateOrderSlice,startOrderItems} = createOrderSlice.actions;
export default createOrderSlice.reducer;