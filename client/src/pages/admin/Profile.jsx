import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetAdminAuthSlice } from '../../redux/admin/authSlice';
import Master from './layout/Master'
function Profile() {
  const {pathname} = useLocation();
  const {adminAuthUser,status,error,validationErrors}= useSelector(state => state.adminAuth);
  const {name,email,phone,image}= adminAuthUser;
  let [current,setCurrent] = useState(pathname);
  const dispatch = useDispatch();
  console.log(validationErrors)
  useEffect(()=>{
    dispatch(resetAdminAuthSlice());
  },[])
  return (
    <Master>
      <ProfileCard 
          authName={name} 
          authEmail={email} 
          authPhone={phone} 
          validationErrors={validationErrors} 
          current={current}
          authImage={image}
          status={status}
          error={error}
      />
    </Master>

  )}

export default Profile