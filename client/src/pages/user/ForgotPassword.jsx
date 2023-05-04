import React from 'react'
import Forgot from '../../assets/images/forgot.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {Button,Form,Modal,Spinner} from 'react-bootstrap';
import { useState } from 'react';
import { resetAuthSlice, resetPassword } from '../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage } from '../../util/message';
import classes from '../../components/InputValidation.module.css';
import ValidationErrorMsg from '../../components/ValidationErrorMsg';
function ForgotPassword() {
  const [email,setEmail] = useState("");
  const dispatch = useDispatch();
  const {status,error,validationErrors} = useSelector(state => state.auth);
  const onSubmit = (e)=>{
    e.preventDefault();
    dispatch(resetPassword({email}));
  }
  if(error){
    dispatch(resetAuthSlice())
    errorMessage(error);
  }
  return (
    <div className='container mt-5'>
      <div className="row align-items-center" >
          <div className='d-none d-lg-block col-lg-6'>
              <div>
                  <img src={Forgot} alt="" style={{width:"100%",}}/>
              </div>
          </div>
          <div className="col-12 col-lg-6 ">
              <Link to='/login' className='p-0 text-black-10'>Back</Link>
              <h5 className='text-black-50 mt-3'>Forgot Your Password</h5>
              {
                status === "reset-password succeeded" && (
                  <div className='alert alert-success'>Please Check your Email</div>
                )
              }
              <Form onSubmit={onSubmit} style={{marginTop:"20px"}}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control
                      type="email"
                      placeholder="Email"
                      autoFocus
                      value={email}
                      className={validationErrors.find((v)=> v.param === "email") && classes.validations}
                      onChange={(e)=>setEmail(e.target.value)}
                  />
                  <ValidationErrorMsg validationErrors={validationErrors} inputField="email"/>
                  </Form.Group>
                <button type='submit' className='btn btn-primary btn-block'>Reset Password</button>
              </Form>
          </div> 
      </div>
    </div>
  )
}

export default ForgotPassword