import React,{useEffect} from 'react'
import {errorMessage} from '../util/message';
import LoadingBox from './LoadingBox';
import KBZLogo  from '../assets/images/kbz.jpeg';
import {Link, useLocation, useParams} from 'react-router-dom'
import WaveLogo from '../assets/images/wave.jpeg';
import { deliveredOrder, detailOrder, paymentOrder, resetCreateOrderSlice } from '../redux/orders/createOrderSlice';
import { useDispatch,useSelector } from 'react-redux';
import { successMessage } from '../util/message';




function OrderDetail() {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    let params = useParams();
    const {adminAuthUser} = useSelector(state =>state.adminAuth);
    const {order,status,error} = useSelector(state => state.orderCreate);
    useEffect(()=>{
            // dispatch(resetCreateOrderSlice())
            if(pathname.includes("admin")){
                dispatch(detailOrder({id:params.id,isAdminShow:true}))
            }else{
                dispatch(detailOrder({id:params.id,isAdminShow:false}))
            }
          
    },[params.id])
    useEffect(()=>{
        if(status === "delivered succeeded"){
            successMessage("Delivered Order Succeeded");
             dispatch(resetCreateOrderSlice());
        }
        if(status === "payment succeeded"){
            successMessage("Payment Succeeded");
            dispatch(resetCreateOrderSlice());
        }
    },[status])
    const paymentHandler =()=>{
        dispatch(paymentOrder(params.id));
       
    }
    const deliveredHandler = (id)=>{
        dispatch(deliveredOrder(id));
    };
   
    
    return (
    <>
        {
            status === "loading" ? <LoadingBox />
            : error ? errorMessage(error)
            :( 
                <div className='row mt-4'>
                    <div className='col-12 col-lg-8 '>
                        <ul className='p-0'>
                            <li className='mb-2'>
                                <div className='card'>
                                    <div className='card-body shadow'>
                                        <h6 className='font-weight-bolder'>Shipping</h6>
                                        <ul>
                                            <li className='text-black-50 mb-1'>
                                                <strong>Name :</strong>
                                                {order?.shipping?.fullName}
                                            </li>
                                            <li className='text-black-50 mb-1'>
                                                <strong>Address :</strong>
                                                {order?.shipping?.address}
                                            </li>
                                            <li className='mt-3'>
                                                {
                                                    order.isDelivered ?(
                                                        <div className='alert alert-success text-center'>
                                                            {new Date(order?.deliveredAt).toLocaleString()}
                                                        </div>
                                                    ):(
                                                    <div className='alert alert-danger text-center'>
                                                        Not delivered
                                                    </div>
                                                    )   
                                                }
                                            
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className='mb-2'>
                                <div className='card'>
                                    <div className='card-body shadow'>
                                        <h6 className='font-weight-bolder'>
                                            Payment 
                                        </h6>
                                        <ul>
                                            <li className='text-black-50 mb-1'>
                                                <strong>Method :</strong>
                                                Wave pay
                                            </li>
                                            <li className='mt-3'>
                                                {
                                                    order?.isPaid ?(
                                                        <div className='alert alert-success text-center'>
                                                            {new Date(order?.paidAt).toLocaleString()}
                                                        </div>
                                                    ):(
                                                    <div className='alert alert-danger text-center'>
                                                        Not Paid
                                                    </div>
                                                    )   
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className='mb-2'>
                                <div className='card'>
                                    <div className='card-body shadow'>
                                        <h6 className='font-weight-bolder'>
                                            Order Medicine 
                                        </h6>
                                        <ul className='pl-3'>  
                                                {
                                                    order && order.orderItems &&  order.orderItems.map((c)=>(
                                                        <li key={c._id}>
                                                            {c.product.image && <img src={"https://myatthuekha-online-medicine.herokuapp.com/"+c.product.image} alt="" style={{width:"60px"}}/>}
                                                           
                                                            <Link to='/' className='ml-3'>{c.product.name}</Link>
                                                            <span className='text-black-50 ml-3'>{c.qty} x {c.product.price} = {c.qty * c.product.price} (MMK)</span>
                                                        </li>
                                                    ))
                                                }
                                        </ul>
                                    </div>
                                </div>
                            </li>
                           
                        </ul>
                    </div>
                    <div className='col-12 col-lg-4'>
                        <div className='card mb-2'>
                            <div className='card-body shadow'>
                                <h5 className='font-weight-bolder text-center mb-4'>Order Summary</h5>
                                <table>
                                        <tr>
                                            <td className='text-black-50' style={{width:"180px"}}>
                                                <strong>Medicine Total Price</strong>
                                            </td>
                                            <td className='text-black-50'>: {order?.medicineTotalPrice} (MMK)</td>
                                        </tr>
                                        <tr>
                                            <td className='text-black-50'>
                                                <strong>Taxi Price</strong>
                                            </td>
                                            <td className='text-black-50'>: {order?.shipping?.taxi ? 1000 : 0} (MMK)</td>
                                        
                                        </tr>
                                </table>
                                <hr />
                                <table>
                                    <tr>
                                        <td className='text-black-50 text-right pr-3' style={{width:"180px"}}>
                                            <strong>Amount {' '}</strong>
                                        </td>
                                        <td className='text-black-50'>
                                            : {order?.totalAmount} (MMK)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-black-50 text-right pr-3'>
                                            <strong>Discount Price{' '}</strong>
                                        </td>
                                        <td className='text-black-50'>
                                            : {order?.discountPrice} (MMK)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-black-50 text-right pr-3'>
                                            <strong>Total Amount</strong>
                                        </td>
                                        <td className='text-black-50'>
                                        {order?.totalAmount- order?.discountPrice} (MMK)
                                        </td>
                                    </tr>
                                </table>
                                {
                                    !order.isPaid  && !pathname.includes("admin") &&(
                                        <button className='btn btn-block btn-primary mt-3' onClick={paymentHandler}>
                                        {order?.shipping?.payment === "wavepay" ? (
                                            <>
                                                <img src={WaveLogo} alt="" style={{width:"40px",borderRadius:"50%"}}/>
                                                <span className='ml-2'>Wave Pay</span>
                                            </>
                                            
                                        ):(
                                            <>
                                                <img src={KBZLogo} alt="" style={{width:"40px",borderRadius:"50%"}}/>
                                                <span className='ml-2'>KBZ Pay</span>
                                            </>
                                            
                                        )}                     
                                        </button>
                                        
                                    )
                                }
                                {
                                    adminAuthUser && pathname.includes("admin") && !order.isDelivered &&(
                                        <button className='btn btn-block btn-primary mt-3' onClick={()=>deliveredHandler(order._id)}>
                                                Delivered Order
                                        </button>
                                    )
                                }
                            
                            </div>
                        </div>  
                       
                               
                    </div>
                 
                </div>
            )
                
            
         }
    </>
  )
}

export default OrderDetail