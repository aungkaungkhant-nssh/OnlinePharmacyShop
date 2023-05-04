import React from 'react'
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import classes from '../pages/user/Profile.module.css';
import ValidationErrorMsg from './ValidationErrorMsg';
import { useDispatch } from 'react-redux';
import { adminPasswordUpdate, adminProfileUpdate } from '../redux/admin/authSlice';
import {successMessage,errorMessage} from '../util/message';
import {resetAuthSlice} from "../redux/auth/authSlice";
import {resetAdminAuthSlice} from '../redux/admin/authSlice';
function ProfileCard({authName,authEmail,authPhone,authImage,status,current,validationErrors,error}) {
    const [name,setName] = useState(authName);
    const [email,setEmail] = useState(authEmail);
    const [phone,setPhone] = useState(authPhone);
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setconfirmPassword] = useState('');
    const [currentProfilePath,setCurrentProfilePath] = useState(current.split('/')[2]);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(status === 'succeeded'){
            if(currentProfilePath === "account-settings"){
                successMessage("Profile Update Successfully");
            }else{
                setNewPassword('');
                setconfirmPassword('');
                setOldPassword('');
                successMessage("Password Update Successfully");
            }
            dispatch(resetAuthSlice());
            dispatch(resetAdminAuthSlice());
        }
        if(status === "failed" && error){
            errorMessage(error);
            dispatch(resetAuthSlice());
            dispatch(resetAdminAuthSlice());
        }
      },[status])

    const handleClick=(c)=>{
        setCurrentProfilePath(c)
    }
    const updateProfile = (e)=>{
        e.preventDefault();
       
        if(current.includes("admin")){ 
            dispatch(adminProfileUpdate({name,email,phone}));
            dispatch(resetAdminAuthSlice());
        }
    }
    const updatePassword = (e)=>{
        e.preventDefault();
        if(current.includes("admin")){
            dispatch(adminPasswordUpdate({oldPassword,newPassword,confirmPassword}));
            dispatch(resetAdminAuthSlice());
        }
    }
  return (
    <section className={`container ${classes.profile}`}>
        <div className='row no-gutters'>
            <div className='col-12 col-md-4 col-lg-3 '>
                <div className={`card ${classes.sidebar}`}>
                    <div className='card-body shadow'>
                        <div className='text-center'>
                            <img src={"https://myatthuekha-online-medicine.herokuapp.com/"+authImage} alt="" className={classes.profileImage}/>
                            <h4 className='font-weight-bolder my-3'></h4>
                        </div>
                       
                        <div className='my-4'>
                            <ul className='p-0'>
                                <li className={`text-black ${currentProfilePath ==="account-settings" && classes.active}`}  style={{padding:"13px 15px",cursor:"pointer"}} onClick={()=>handleClick("account-settings")}>
                                    <i class="fa-solid fa-house"></i>
                                    <span className='ml-3'>Account</span>
                                </li>
                                <hr className='m-0'/>
                                <li className={`text-black ${currentProfilePath ==="change-passwords" && classes.active}`}  style={{padding:"13px 15px",cursor:"pointer"}}onClick={()=>handleClick("change-passwords")}>
                                    <i class="fa-solid fa-key"></i>
                                    <span className='ml-3'>Password</span>
                                </li>
                                <hr className=' m-0'/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-8 mt-md-0 mt-3 col-lg-9'>
                <div className={`card ${classes.sidebar}`}>
                    <div className='card-body shadow'>
                        <h3 className='mb-3'>{currentProfilePath==="account-settings" ? "Account-Setting":"Password-Setting"}</h3>
                        <div>
                            {
                                currentProfilePath=== "account-settings" ?(
                                    <form onSubmit={updateProfile}>
                                        <div className='form-group'>
                                            <label htmlFor="">Name</label>
                                            <input type="text"
                                                 className={`form-control ${validationErrors.find((v)=> v.param === "name") && classes.validations}`}
                                                 value={name} 
                                                 onChange={(e)=>setName(e.target.value)}/>
                                            <ValidationErrorMsg validationErrors={validationErrors} inputField="name"/>
                                        </div>  
                                        <div className='form-group'>
                                            <label htmlFor="">Email</label>
                                            <input 
                                                type="email" 
                                                className={`form-control ${validationErrors.find((v)=> v.param === "email") && classes.validations}`}
                                                value={email} 
                                                onChange={(e)=>setEmail(e.target.value)}/>
                                            <ValidationErrorMsg validationErrors={validationErrors} inputField="email"/>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="">Phone</label>
                                            <input 
                                                type="number" 
                                                className={`form-control ${validationErrors.find((v)=> v.param === "phone") && classes.validations}`}
                                                value={phone} 
                                                onChange={(e)=>setPhone(e.target.value)}/>
                                            <ValidationErrorMsg validationErrors={validationErrors} inputField="phone"/>
                                        </div>
                                        <div>
                                            <button className='btn btn-primary' type='submit'>
                                                {
                                                    status === "loading" ?( 
                                                        <>
                                                               <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                <span className='ml-1'>Loading...</span>
                                                        </>
                                                    )
                                                    :(
                                                       "update"
                                                    )
                                                }
                                                
                                            </button>
                                        </div>
                                    </form>
                                ):(
                                    <form onSubmit={updatePassword}>
                                        <div className='form-group'>
                                            <label htmlFor="">Old Password</label>
                                            <input 
                                                type="password" 
                                                className={`form-control ${validationErrors.find((v)=> v.param === "oldPassword") && classes.validations}`}
                                                value={oldPassword} 
                                                onChange={(e)=>setOldPassword(e.target.value)}/>
                                            <ValidationErrorMsg validationErrors={validationErrors} inputField="oldPassword"/>
                                        </div>
                                        <div class="form-row">
                                            <div class="col">
                                                <label htmlFor="">New Password</label>
                                                <input 
                                                    type="password" 
                                                    className={`form-control ${validationErrors.find((v)=> v.param === "newPassword") && classes.validations}`}
                                                    value={newPassword} 
                                                    onChange={(e)=>setNewPassword(e.target.value)}/>
                                                <ValidationErrorMsg validationErrors={validationErrors} inputField="newPassword"/>
                                            </div>
                                            <div class="col">
                                                <label htmlFor="">Confirm Password</label>
                                                <input 
                                                    type="password" 
                                                    className={`form-control ${validationErrors.find((v)=> v.param === "confirmPassword") && classes.validations}`}
                                                    value={confirmPassword} 
                                                    onChange={(e)=>setconfirmPassword(e.target.value)}/>
                                                <ValidationErrorMsg validationErrors={validationErrors} inputField="confirmPassword"/>
                                            </div>
                                           
                                        </div>
                                       
                                        <button className='btn btn-primary mt-4' type='submit'>
                                                Update
                                        </button>
                                    </form>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProfileCard