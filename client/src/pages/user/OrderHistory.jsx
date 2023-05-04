import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../../components/LoadingBox';

import { errorMessage } from '../../util/message';
import Master from './layout/Master'
import {fetchOrdersHistory} from '../../redux/orders/historyOrderSlice';
import {Link} from 'react-router-dom'
function OrderHistory() {
  const {status,orders,error} = useSelector(state => state.historyOrder);
  const dispatch = useDispatch();
  
  useEffect(()=>{
      dispatch(fetchOrdersHistory())
  },[dispatch]);
  let content;
  if(status === "loading"){
    content = <LoadingBox />
  }else if(status === "succeeded"){
    content = <table className='table my-5'>
      <tr>
          <th>Order Id</th>
          <th>Order Items</th>
          <th>Status</th>
          <th>Total Amount</th>
          <th>Date</th>
          <th>Acion</th>
      </tr>
      {
            orders.map((o)=>(
      <tr>
         
              <>
                  <td>#{o._id}</td>
                  <td>{o.orderItems.map((item,index,array)=>{
                        let medicineItem="";   
                        if(array.length-1 === index){
                        
                          medicineItem+=item.product.name;
                        }else{
                         
                          medicineItem+= item.product.name + ",";
                        }
                        return medicineItem;
                  })}</td>
                  <td>
                    <span className={`badge badge-${o.status=== "pending" ? 'warning' :'success'} text-white`}>
                      {o.status}
                    </span>
                  </td>
                  <td>{o.totalAmount} (MMK)</td>
                  <td>{new Date(o.createdAt).toLocaleString().split(',')[0]}</td>
                  <td>
                    <Link to={`/order/${o._id}`}><i className="fa-solid fa-eye btn btn-primary btn-sm"></i></Link>
                  </td>
              </>
            
           
      </tr>
       ))
      }
    </table>
  }else if(status === "failed"){
    content = errorMessage(error)
  }
  return (
    <Master>
      {content}
    </Master>
  )
}

export default OrderHistory