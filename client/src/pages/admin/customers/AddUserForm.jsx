import React,{useState,useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom';
import Master from '../layout/Master';
import {useSelector} from 'react-redux';
import { useDispatch  } from 'react-redux';
import {createUser, resetUserSlice} from '../../../redux/admin/userSlice'
import {successMessage} from '../../../util/message';
import classes from '../../../components/InputValidation.module.css'
import ValidationErrorMsg from '../../../components/ValidationErrorMsg';
import axios from 'axios'
function AddUserForm() {
  const [name,setName]= useState("");
  const [email,setEmail]= useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword]= useState("");
  const [userimage,setUserImage] = useState("");
  const dispatch = useDispatch();
  const {status,validationErrors,error} = useSelector(state => state.user);

  useEffect(()=>{
    if(status !== "idle"){
      dispatch(resetUserSlice())

    }
    if(status === "create succeeded") {
      successMessage("Create User Successfully");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setUserImage("");
      dispatch(resetUserSlice())
      
   }
  },[status]);
  const registerHandler = async(e)=>{
    e.preventDefault();
    if(name && email && phone && password && userimage){
      const data = new FormData();
      data.append("file",userimage)
      data.append("upload_preset","onlinepharmacyshop");
      data.append("cloud_name","dqlplxvtx");
      let image = await axios.post("https://api.cloudinary.com/v1_1/dqlplxvtx/image/upload",data)
      
      dispatch(createUser({name,email,phone,password,image:image?.data.url || ""}));
    }
    
  }
  const choooseUserimage = (e)=>{
    setUserImage(e.target.files[0])
  }
  
  return (
    <Master>
      <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-body shadow'>
                <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0">Add User</h5>
                          <Link to="/admin/lists-user">
                              <i className="fa-solid fa-list mr-2"></i>
                          </Link>
                  </div>
                  <hr />
                  <form onSubmit={registerHandler}>
                          <div className='form-group'>
                              <label htmlFor="">Name</label>
                              <input 
                                   type="text"
                                   className={`form-control ${validationErrors.find((v)=> v.param === "name") && classes.validations}`}
                                   value={name} onChange={(e)=>setName(e.target.value)}/>
                              <ValidationErrorMsg validationErrors={validationErrors} inputField="name"/>
                          </div>
                          <div className='form-group'>
                              <label htmlFor="">Email</label>
                              <input 
                                    type="email" 
                                    className={`form-control ${validationErrors.find((v)=> v.param === "email") && classes.validations}`}
                                    value={email} onChange={(e)=>setEmail(e.target.value)} />
                              <ValidationErrorMsg validationErrors={validationErrors} inputField="email"/>
                          </div>
                          <div className='form-group'>
                              <label htmlFor="">Phone</label>
                              <input 
                                  type="text" 
                                  className={`form-control ${validationErrors.find((v)=> v.param === "phone") && classes.validations}`} 
                                  value={phone} onChange={(e)=>setPhone(e.target.value)} />
                              <ValidationErrorMsg validationErrors={validationErrors} inputField="phone"/>
                          </div>
                          <div className="form-group mb-2">
                                  <label htmlFor="">Profile Picture</label>
                                  <input type="file" className="form-control" onChange={choooseUserimage}/>
                          </div>
                          <div className="form-group mb-2">
                                  <label htmlFor="">Password</label>
                                  <input 
                                      type="password" 
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
                                  'Add User'
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

export default AddUserForm