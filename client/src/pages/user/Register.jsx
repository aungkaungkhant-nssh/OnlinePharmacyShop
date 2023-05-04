import React, { useState } from 'react'
import {Button,Form,Modal,Spinner} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister,resetAuthSlice } from '../../redux/auth/authSlice';
import classes from '../../components/InputValidation.module.css';
import ValidationErrorMsg from '../../components/ValidationErrorMsg';
import { errorMessage,successMessage } from '../../util/message';
import RegisterVector from '../../assets/images/register.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [image,setImage] = useState();
    const {loading,error,validationErrors,status,authSlice} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(resetAuthSlice())
    },[])
    const onSubmit =async (e)=>{
      e.preventDefault();
      let photo;
      if(image){
        const data = new FormData();
        data.append("file",image)
        data.append("upload_preset","onlinepharmacyshop");
        data.append("cloud_name","dqlplxvtx");
        photo = await axios.post("https://api.cloudinary.com/v1_1/dqlplxvtx/image/upload",data)
       
      }
      dispatch(userRegister({name,email,phone,password,confirmPassword,image:photo?.data.url || ""}))
    }
    if(error){ // has Error
      dispatch(resetAuthSlice())
      return errorMessage(error);
    }
    if(status === "signup success"){  // success Register
        dispatch(resetAuthSlice());
        navigate('/login');
    }
    const chooseUserImage = (e)=>{
      setImage(e.target.files[0])
    }
  return (
    <div className='container mt-5'>
        <div className='row align-items-center'>
            <div className='d-none d-lg-block col-lg-6'>
                <div>
                    <img src={RegisterVector} alt="" style={{width:"100%",}}/>
                </div>
            </div>
            <div className='col-lg-6 col-12'>
                <Link to='/' className='p-0 text-black-10'>Welcome Back</Link>
                <h5 className='text-black-50 mt-3'>Create Your Account</h5>
                <Form onSubmit={onSubmit} style={{marginTop:"30px"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                            type="text"
                            placeholder="Name"
                            autoFocus
                            value={name}
                            className={validationErrors.find((v)=> v.param === "name") && classes.validations}
                            onChange={(e)=>setName(e.target.value)}
                            />
                        <ValidationErrorMsg validationErrors={validationErrors} inputField="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        className={validationErrors.find((v)=> v.param === "email") && classes.validations}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <ValidationErrorMsg validationErrors={validationErrors} inputField="email"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                        type="number"
                        placeholder="Phone Number"
                        value={phone}
                        className={validationErrors.find((v)=> v.param === "phone") && classes.validations}
                        onChange={(e)=>setPhone(e.target.value)}
                        />
                        <ValidationErrorMsg validationErrors={validationErrors} inputField="phone"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                        type="file"
                        onChange = {chooseUserImage}
                        />
            
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        className={validationErrors.find((v)=> v.param === "password") && classes.validations}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <ValidationErrorMsg validationErrors={validationErrors} inputField="password"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        className={validationErrors.find((v)=> v.param === "confirmPassword") && classes.validations}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        <ValidationErrorMsg validationErrors={validationErrors} inputField="confirmPassword"/>
                    </Form.Group>
                    <Button variant="primary" size="lg" style={{width:"100%"}} type="submit">
                        {
                            loading ? <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : 'Register'
                        }
                        
                    </Button>
                    <hr />
                    <div className="text-center">
                        <span>
                            Already you have an account ?
                            <Link to="/login" className='login-btn ml-2'>
                                Login
                            </Link>
                        </span>
                        
                    </div>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default Register