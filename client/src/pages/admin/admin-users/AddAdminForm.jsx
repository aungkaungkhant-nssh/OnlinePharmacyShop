import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, resetAdminSlice } from '../../../redux/admin/adminSlice';
import Master from '../layout/Master'
import {successMessage} from '../../../util/message'
import { Link } from 'react-router-dom';
import ValidationErrorMsg from '../../../components/ValidationErrorMsg';
import classes from '../../../components/InputValidation.module.css'
function AddAdminForm() {
  const [name,setName]= useState("");
  const [email,setEmail]= useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword]= useState("");
  const [role,setRole] = useState(3);
  const [userimage,setUserImage] = useState("");
  const dispatch = useDispatch();
  const {status,validationErrors,error} = useSelector(state => state.admin);
  useEffect(()=>{
    if(status !== "idle"){
      dispatch(resetAdminSlice())
    }
    if(status === "create succeeded") {
      successMessage("Create Admin Successfully");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("")
      setUserImage("");
      dispatch(resetAdminSlice())
      
   }
  },[status]);

  const choooseUserimage = (e)=>{
    setUserImage(e.target.files[0])
  }
  const registerHandler = (e)=>{
    e.preventDefault();
    dispatch(createAdmin({name,email,phone,password,role:Number(role),userimage}));

  }
 
  return (
    <Master>
        <div className='row'>
            <div className='col-12'>
              <div className='card'>
                <div className='card-body shadow'>
                   <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Add Admin</h5>
                            <Link to="/admin/admin-lists">
                                <i className="fa-solid fa-list mr-2"></i>
                            </Link>
                    </div>
                    <hr />
                    <form onSubmit={registerHandler}>
                        <div className='form-group'>
                          <label htmlFor="">Name</label>
                          <input type="text" 
                               className={`form-control ${validationErrors.find((v)=> v.param === "name") && classes.validations}`}
                              value={name} onChange={(e)=>setName(e.target.value)}/>
                          <ValidationErrorMsg validationErrors={validationErrors} inputField="name"/>
                        </div>
                        <div className='form-group'>
                          <label htmlFor="">Email</label>
                          <input type="text" 
                                 className={`form-control ${validationErrors.find((v)=> v.param === "email") && classes.validations}`} 
                                value={email} onChange={(e)=>setEmail(e.target.value)} />
                          <ValidationErrorMsg validationErrors={validationErrors} inputField="email"/>
                        </div>
                        <div className='form-group'>
                          <label htmlFor="">Phone</label>
                          <input type="text" 
                                 className={`form-control ${validationErrors.find((v)=> v.param === "phone") && classes.validations}`}
                                value={phone} onChange={(e)=>setPhone(e.target.value)} />
                          <ValidationErrorMsg validationErrors={validationErrors} inputField="phone"/>
                        </div>
                        <div className='form-group'>
                          <label htmlFor="">Select Admin Roles</label>
                          <select value={role}  id="" className='form-control' onChange={e => setRole(e.target.value)}>
                              <option value="3">Worker</option>
                              <option value="2">Assistant</option>
                          </select>
                        </div>
                        <div className="form-group mb-2">
                                <label htmlFor="">Profile Picture</label>
                                <input type="file" className="form-control" onChange={choooseUserimage}/>
                        </div>
                        <div className="form-group mb-2">
                                <label htmlFor="">Password</label>
                                <input type="password" 
                                         className={`form-control ${validationErrors.find((v)=> v.param === "password") && classes.validations}`} 
                                        value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                <ValidationErrorMsg validationErrors={validationErrors} inputField="password"/>
                        </div>
                        <button type='submit' className='btn btn-primary mt-2'>
                          {
                            status === "loading" ?( 
                                <>
                                       <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className='ml-1'>Loading...</span>
                                </>
                            )
                            :(
                               "Add admin"
                            )
                          }
                        </button>
                    </form>
                </div>
              </div>
            </div>
        </div>
    </Master>
  )
}

export default AddAdminForm