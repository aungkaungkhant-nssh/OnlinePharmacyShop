import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CheckOutStep from '../../components/CheckOutStep'
import { addShipping } from '../../redux/products/shippingSlice';
import Master from './layout/Master'

function Shipping() {
  const [fullName,setFullname] = useState('');
  const [address,setAddress] =useState('');
  const [city,setCity] = useState('');
  const [phone,setPhone] = useState('');
  const [taxi,setTaxi] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem("cartItems")) || JSON.parse(localStorage.getItem("cartItems")).length<=0){
      navigate('/cart')
    }
  },[])
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    if(fullName && address && city && phone){
      dispatch(addShipping({fullName,address,city,phone,taxi}));
      if(searchParams.get('start_order')==="true") return navigate('/payment?start_order=true')
      navigate('/payment');
    }
  }
 
  return (
    <Master>
        <div className='my-3'>
          <CheckOutStep signIn={true} shipping={true}/>
        </div>
        <div className='container my-5'>
          
          <div className='row'>
              <div className='col-12 col-md-6 offset-md-3'>
                <h5 className='text-black font-weight-bolder mb-4'>Shipping Address</h5>
                <form onSubmit={onSubmitHandler}>
                  <div className='form-group'>
                    <label htmlFor="">Full Name</label>
                    <input type="text" className='form-control' value={fullName} onChange={(e)=>setFullname(e.target.value)}/>
                  </div>
                  <div className='form-group'>
                    <label htmlFor="">Address</label>
                    <textarea className='form-control' value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                  </div>
                  <div className='form-group'>
                    <label htmlFor="">City</label>
                    <input type="text" className='form-control' value={city} onChange={(e)=>setCity(e.target.value)}/>
                  </div>
                  <div className='form-group'>
                    <label htmlFor="">Phone Number</label>
                    <input type="number" className='form-control' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                  </div>
                  <div class="form-check-inline mb-3">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" value={taxi} onChange={(e)=>setTaxi(!taxi)} />Delivery
                      </label>
                  </div>
                  <button className='btn btn-block btn-primary' type='submit'  disabled={!fullName || !address || !city || !phone}>Continue</button>
                </form>
              </div>
          </div>
        </div>
    </Master>
  )
}

export default Shipping