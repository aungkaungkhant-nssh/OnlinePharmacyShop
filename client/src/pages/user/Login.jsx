import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthSlice, userLogin } from '../../redux/auth/authSlice';
import { errorMessage,successMessage } from '../../util/message';
import {Button,Form,Modal,Spinner} from 'react-bootstrap';
import ValidationErrorMsg from '../../components/ValidationErrorMsg';
import classes from '../../components/InputValidation.module.css';
import Auth from '../../assets/images/authphoto.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Login() {
    const dispatch = useDispatch();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {loading,error,validationErrors,status} = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(resetAuthSlice())
    },[])
    const onSubmit =(event)=>{
        event.preventDefault();
        dispatch(userLogin({email,password}));
    }
    if(error){
        dispatch(resetAuthSlice())
        return errorMessage(error);
      }
    if(status === "login success"){
    dispatch(resetAuthSlice())
    successMessage("User Login Successfully");
    navigate('/');
    }
      
  return (
    <div className='container mt-5'>
        <div className="row align-items-center" >
            <div className='d-none d-lg-block col-lg-6'>
                <div>
                    <img src={Auth} alt="" style={{width:"100%",}}/>
                </div>
            </div>
            <div className="col-12 col-lg-6 ">
                <Link to='/' className='p-0 text-black-10'>Welcome Back</Link>
                <h5 className='text-black-50 mt-3'>Login Your Account</h5>
                <Form onSubmit={onSubmit} style={{marginTop:"30px"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        autoFocus
                        value={email}
                        className={validationErrors.find((v)=> v.param === "email") && classes.validations}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <ValidationErrorMsg validationErrors={validationErrors} inputField="email"/>
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
                    <Button variant="primary" size="lg" style={{width:"100%"}} type="submit">
                        {
                        loading ? <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        /> : 'Login'
                        }
                    
                    </Button>
                    <hr />
                    <div className="text-center">
                        <span>
                            Create New Account   <Link to='/register'>SignUp</Link>
                        </span>
                        <div className='pt-2'>
                            <Link to="/forgot-password" className='text-black-50'>Forgot Password</Link>
                        </div>
                    </div>
                </Form>
            </div> 
        </div>
    </div>


  )
}

export default Login