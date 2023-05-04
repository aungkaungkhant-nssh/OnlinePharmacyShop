import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckOutStep from '../../components/CheckOutStep'
import Master from './layout/Master'
import Wave from '../../assets/images/wave.jpeg'
import KBZ from '../../assets/images/kbz.jpeg'
import { addPaymentMethod } from '../../redux/products/shippingSlice';
function Payment() {
  const {shipping} = useSelector(state => state.shipping);
  const navigate = useNavigate();
  const [wavepay,setWavePay] = useState(false);
  const [kbzpay,setKbzPay] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  useEffect(()=>{
     if(Object.keys(shipping).length === 0){
        navigate('/shipping');
        return
     }
  },[]);
  const handleClicked = ()=>{
    if(wavepay || kbzpay){
        const payment = wavepay ? "wavepay" : "kbzpay";
        dispatch(addPaymentMethod({payment}));
        if(searchParams.get("start_order")==="true") return navigate('/placeorder?start_order=true');
        navigate('/placeorder');
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
                <h5 className='text-black font-weight-bolder mb-5'>Payment Method</h5>
                <div className='row align-items-center'>
                  <div className='col-md-6'>
                    <div className='d-flex align-items-center'>
                        <img src={Wave} alt="" style={{width:"60px",borderRadius:"50%"}}/>
                        <p className='ml-4'>Wave Pay</p>
                    </div>
                   
                  </div>
                  <div className='col-md-6'>
                    <input type="checkbox"  onChange={()=>setWavePay(!wavepay)}/>
                  </div>
                </div>
                <hr />
                <div className='row align-items-center'>
                  <div className='col-md-6'>
                    <div className='d-flex align-items-center'>
                        <img src={KBZ} alt="" style={{width:"60px",borderRadius:"50%"}}/>
                        <p className='ml-4' >KBZ Pay</p>
                    </div>
                  </div>
                
                  <div className='col-md-6'>
                    <input type="checkbox" onChange={()=>setKbzPay(!kbzpay)}/>
                  </div>
                </div>
                {wavepay}
                <button className='btn btn-block btn-primary mt-5' onClick={handleClicked} disabled={!wavepay && !kbzpay}>Continue</button>
              </div>
              
          </div>
        </div>
    </Master>
  )
}

export default Payment