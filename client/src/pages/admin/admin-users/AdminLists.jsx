import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAdmin, fetchAdminUserLists, resetAdminSlice, updateRole } from '../../../redux/admin/adminSlice';

import Master from '../layout/Master'
import 'jquery/dist/jquery.min';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import { errorMessage, successMessage } from '../../../util/message';
import LoadingBox from '../../../components/LoadingBox'
import DataTable from '../../../components/DataTable';
function AdminLists() {
  const {adminAuthUser} = useSelector((state)=>state.adminAuth)
  const dispatch = useDispatch();
  const {adminUsers,status,error} = useSelector(state => state.admin);

  useEffect(()=>{
    dispatch(resetAdminSlice());
    dispatch(fetchAdminUserLists());
    
  },[]);
  const deleteHandler = (id)=>{
    dispatch(deleteAdmin(id));
   
  }
  const handleUpdateRole = (_id,role)=>{
    dispatch(updateRole({_id,role}));
  }
  useEffect(()=>{
    if(status === "Delete succeeded"){
      successMessage("Admin Deleted Successfully");
      dispatch(resetAdminSlice());
    }
    if(status === "Update succeeded"){
      successMessage("Admin Update Successfully");
      dispatch(resetAdminSlice());
    }
  },[status])

  
  return (
    <Master>
      {
        status === "loading" 
        ? <LoadingBox></LoadingBox>
        : error ? errorMessage(error)
        : (
          <DataTable data={adminUsers} deleteHandler={deleteHandler} handleUpdateRole={handleUpdateRole}/>
        )
      }
      
    </Master>
  )
}

export default AdminLists

{/* <th>Name</th>
<th>Profile</th>
<th>Email</th>
<th>Phone</th>
<th>Role</th>
<th>Action</th> */}