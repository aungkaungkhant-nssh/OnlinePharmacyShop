import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
  const {authUser} = useSelector((state)=>state.auth);
  return authUser ? children :<Navigate to="/login" />; 
}

export default PrivateRoute