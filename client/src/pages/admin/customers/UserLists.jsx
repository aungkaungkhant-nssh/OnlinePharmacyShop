import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUserLists, resetUserSlice } from '../../../redux/admin/userSlice';
import Master from '../layout/Master';

import {errorMessage, successMessage} from '../../../util/message';
import DataTable from '../../../components/DataTable';
import LoadingBox from '../../../components/LoadingBox';
import { deleteProductForAdminPannel, fetchProductsForAdminPannel } from '../../../redux/admin/productsSlice';

function UserLists() {
  const  dispatch = useDispatch();
  const {users,error,status} = useSelector(state => state.user);

  useEffect(()=>{
    dispatch(resetUserSlice());
    dispatch(fetchUserLists());
    
  },[]);
  const deleteHandler = (id)=>{
    dispatch(deleteUser(id));
   
  }
  
  useEffect(()=>{
    if(status === "Delete succeeded"){
      successMessage("User Deleted Successfully");
      dispatch(resetUserSlice());
    }
  
  },[status])

  return (
    <Master>
    
        {
          status === "loading" 
          ?  <LoadingBox />
          : error ? errorMessage(error)
          :(
            <DataTable data={users} deleteHandler={deleteHandler} handleUpdateRole={''}/>
          ) 
        }
        
    </Master>
  )
}

export default UserLists