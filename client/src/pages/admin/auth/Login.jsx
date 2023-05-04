import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogin, resetAdminAuthSlice } from '../../../redux/admin/authSlice';
import { errorMessage } from '../../../util/message';
import ValidationErrorMsg from '../../../components/ValidationErrorMsg';
import classes from '../../../components/InputValidation.module.css'
function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {status,error,validationErrors,adminAuthUser} = useSelector(state => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
 
    if(adminAuthUser){
        dispatch(resetAdminAuthSlice())
        navigate('/admin/dashboard');
    }
    if(status === "failed" && error){
        errorMessage(error);
    }
  },[status,navigate])
  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(adminLogin({email,password}))
    
  }
 
  return (
    <div className='container' style={{marginTop:"100px"}}>
        <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
            <div>
                <div className="card">
                    <h3 className="text-center mt-3 text-black-50">Admin Login</h3>
                    <div className="card-body">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <input type="email" 
                                    className={`form-control ${validationErrors.find((v)=> v.param === "email") && classes.validations}`}
                                    placeholder="email"
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)} />
                                <ValidationErrorMsg validationErrors={validationErrors} inputField="email"/>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className={`form-control ${validationErrors.find((v)=> v.param === "password") && classes.validations}`}
                                       placeholder="password"
                                       name="password"
                                       value={password} onChange={(e)=>setPassword(e.target.value)} />
                                <ValidationErrorMsg validationErrors={validationErrors} inputField="password"/>
                            </div>
                            <div className="form-group text-center">
                                <button class="btn btn-secondary btn-block" type="submit" >
                                    {
                                        
                                            status === "loading" ?( 
                                                <>
                                                       <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span className='ml-1'>Loading...</span>
                                                </>
                                            )
                                            :(
                                               "Login"
                                            )
                                    }
                                    
                                      
                                </button>
                                <p className="text-black-50 mt-3"  data-toggle="modal" data-target="#myModal">Forgot Password?</p>

                            </div>
                        </form>
                        <div className="modal" id="myModal">
                            <div className="modal-dialog">
                              <div className="modal-content">
                          
                            
                                <div className="modal-header">
                                  <h4 className="modal-title">Reset Password</h4>
                                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                          
                            
                                <div className="modal-body">
                                    <form action="/admin/reset-password" method="post">
                                        <div className="form-row">
                                            <div className="col-auto">
                                                <input type="email" placeholder="enter your email" className="form-control" name="email" />
                                            </div>
                                            <div className="col-auto">
                                                <button type="submit" className="btn btn-primary">
                                                    <i className="fa-solid fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>                
                                </div>
                          
                             
                          
                              </div>
                            </div>
                          </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>

    </div>
    
  )
}

export default Login