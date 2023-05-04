import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function AdminRoute({children}) {
 const {adminAuthUser} = useSelector((state)=>state.adminAuth);
  return adminAuthUser ? children :<Navigate to="/admin/login" />;
}

export default AdminRoute