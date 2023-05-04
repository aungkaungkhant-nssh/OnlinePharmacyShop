import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Master from './layout/Master'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import { createOrder, resetCreateOrderSlice } from '../../redux/orders/createOrderSlice';
import { errorMessage } from '../../util/message';
import { resetCartItems } from '../../redux/products/addToCartSlice';
import LoadingBox from '../../components/LoadingBox';
import { useState } from 'react';

function PlaceOrder() {
  const [searchParams] = useSearchParams();
  const {shipping} = useSelector(state =>state.shipping);
  const {cartItems} = useSelector(state => state.addToCart);
  const {startOrder}=useSelector(state => state.orderCreate);

  const [medcineItems,setmedicineItems] = useState(
                                            searchParams.get("start_order") && startOrder ?
                                            startOrder : cartItems
                                        );

  const toPrice = (price)=>Number(price.toFixed(2))
  const medicineTotalPrice = toPrice(medcineItems.reduce((a,c)=>a+(c.price * c.qty),0));
  const discountPrice = toPrice(medicineTotalPrice > 10000 ? 100 : 0);
  const taxPrice = toPrice(shipping.taxi ? 1000 : 0);
  const totalAmount =toPrice((medicineTotalPrice + taxPrice)-discountPrice);
  const dispatch = useDispatch();
  const {status,error,order} = useSelector(state => state.orderCreate);
  const navigate = useNavigate();

  useEffect(()=>{
        if(status === "success"){
            navigate(`/order/${order._id}`);
            dispatch(resetCreateOrderSlice());
        }
  },[status])
  const placeOrderHandler = ()=>{
    const orderItems = medcineItems.map((c)=>({product:{_id:c._id},qty:c.qty}));
    dispatch(createOrder({shipping,orderItems,medicineTotalPrice,discountPrice,taxPrice,totalAmount}))
    dispatch(resetCartItems());
  }
  if(error) {
    errorMessage(error)
  };
  if(status === "loading"){
    return(
        <Master>
            <LoadingBox />
        </Master>
    )
  }
  return (
    <Master>
        <div className='row mt-4'>
            <div className='col-12 col-md-8 offset-md-2'>
                <div className='card'>
                    <div className='card-body shadow'>
                        <h5 className='text-center font-weight-bolder mb-3'>Order Summary</h5>
                        <div>
                            <h6 className='font-weight-bold mb-2'>Shipping</h6>
                            <ul className='pl-3'>
                                <li className='text-black-50'> <strong>Name</strong> : {shipping.fullName}</li>
                                <li className='text-black-50'> <strong>Address</strong> : {shipping.address}</li>
                                <li className='text-black-50'> <strong>City</strong> : {shipping.city}</li>
                            </ul>
                        </div>
                        <hr />
                        <div>
                            <h6 className='font-weight-bold mb-2'>Payment</h6>
                            <ul className='pl-3'>
                                <li className='text-black-50'> <strong>Method</strong> : {shipping.payment}</li>
                             
                            </ul>
                        </div>
                        <hr />
                        <div>
                            <h6 className='font-weight-bold mb-2'>Order Items</h6>
                            <ul className='pl-3'>
                              {
                                medcineItems.map((c)=>(
                                    <li>
                                        <img src={"https://myatthuekha-online-medicine.herokuapp.com/"+c.image} alt="" style={{width:"60px"}}/>
                                        <Link to='/' className='ml-3'>{c.name}</Link>
                                        <span className='text-black-50 ml-3'>{c.qty} x {c.price} = {c.qty * c.price} (MMK)</span>
                                    </li>
                                ))
                              }
                             
                            </ul>
                        </div>
                        <hr />
                        <div>
                            <h6 className='font-weight-bold mb-2'>Balance</h6>
                            <table>
                                <tr>
                                    <td className='text-black-50' style={{width:"180px"}}>
                                         <strong>Medicine Total Price</strong>
                                    </td>
                                    <td className='text-black-50'>: {medicineTotalPrice} (MMK)</td>
                                </tr>
                                <tr>
                                    <td className='text-black-50'>
                                         <strong>Taxi Price</strong>
                                    </td>
                                    <td className='text-black-50'>: {taxPrice} (MMK)</td>
                                 
                                </tr>
                            </table>
                            <hr />
                            <table>
                                <tr>
                                    <td className='text-black-50 text-right pr-3' style={{width:"180px"}}>
                                        <strong>Amount {' '}</strong>
                                    </td>
                                    <td className='text-black-50'>
                                        : {medicineTotalPrice + taxPrice} (MMK)
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-black-50 text-right pr-3'>
                                        <strong>Discount Price{' '}</strong>
                                    </td>
                                    <td className='text-black-50'>
                                        : {discountPrice} (MMK)
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-black-50 text-right pr-3'>
                                        <strong>Total Amount</strong>
                                    </td>
                                    <td className='text-black-50'>
                                        {totalAmount} (MMK)
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <hr />
                        <button className='btn btn-block btn-primary' onClick={placeOrderHandler}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </Master>
  )
}

export default PlaceOrder