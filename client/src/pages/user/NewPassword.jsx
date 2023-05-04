import React, { useEffect } from 'react'
import { useState } from 'react'
import Forgot from '../../assets/images/forgot.jpg';
import { Link, useNavigate,useParams } from 'react-router-dom';
import {Button,Form,Modal,Spinner} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { getUserDataFromToken, newPassword, resetAuthSlice } from '../../redux/auth/authSlice';
import LoadingBox from '../../components/LoadingBox';
import {errorMessage, successMessage} from '../../util/message';
import classes from '../../components/InputValidation.module.css';
import ValidationErrorMsg from '../../components/ValidationErrorMsg';
function NewPassword() {
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status,tokenUser,error,validationErrors} = useSelector(state => state.auth);
  useEffect(()=>{
    dispatch(getUserDataFromToken({token:params.token}));
  },[dispatch,params.token])
  const onSubmit = (e)=>{
    e.preventDefault();
    dispatch(newPassword({token:params.token,userId:tokenUser._id,password,confirmPassword}));
  }
  if(status ==="newPassword succeeded"){
    navigate('/login');
    dispatch(resetAuthSlice());
  }
  if(error === "Expire Token"){
    errorMessage(error);
    navigate('/forgot-password');
  }
  return (
    <>
       {
        status==="token loading" ? <LoadingBox />
        :error!=="Expire Token"&&error  ? errorMessage(error)
        :(
          <div className='container mt-5'>
          <div className="row align-items-center" >
              <div className='d-none d-lg-block col-lg-6'>
                  <div>
                      <img src={Forgot} alt="" style={{width:"100%",}}/>
                  </div>
              </div>
              <div className="col-12 col-lg-6 ">
                  <Link to='/login' className='p-0 text-black-10'>Welcome Back</Link>
                  <h5 className='text-black-50 mt-3'>Reset Your Password</h5>
                
                  <Form onSubmit={onSubmit} style={{marginTop:"20px"}}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            autoFocus
                            value={password}
                            className={validationErrors.find((v)=> v.param === "password") && classes.validations}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <ValidationErrorMsg validationErrors={validationErrors} inputField="password"/>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Control 
                            type="password"
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            className={validationErrors.find((v)=> v.param === "confirmPassword") && classes.validations}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        <ValidationErrorMsg validationErrors={validationErrors} inputField="confirmPassword"/>
                      </Form.Group>
                    <button type='submit' className='btn btn-primary btn-block'>Send</button>
                  </Form>
              </div> 
          </div>
          </div>
        )
       }
  
    </>
   
  )
}

export default NewPassword