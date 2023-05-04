import React from 'react';
import { useEffect } from 'react';
import Master from '../layout/Master';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrderLists, resetOrderSlice } from '../../../redux/admin/orderSlice';
import {errorMessage} from '../../../util/message';
import LoadingBox from '../../../components/LoadingBox';
import { useNavigate } from 'react-router-dom';
import {successMessage} from '../../../util/message';
function OrderLists() {
    
    const dispatch = useDispatch();
    const {status,orders,error} = useSelector(state =>state.orders);
    const navigate = useNavigate();
    useEffect(()=>{
        if(status === "idle"){
            dispatch(fetchOrderLists());
            $(document).ready(function () {
                setTimeout(function(){
                $('#orderLists').DataTable();
                } ,1000);
            })
        }
        
    },[])
    const deleteHandler = (id)=>{
        dispatch(deleteOrder(id));
    }
    const detailHandler = (id)=>{
        navigate(`/admin/order/${id}`)
    }
    useEffect(()=>{
        if(status === "Delete succeeded"){
          successMessage("Order Deleted Successfully");
          dispatch(resetOrderSlice());
        }
      
      },[status])
  return (
   <Master>
        <div className='row'>
            <div className='col-12 mt-4'>
            {
            status === "loading" ? <LoadingBox />
            :error ? errorMessage(error)
            :(
                <table id="orderLists" className="table table-hover table-bordered" >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((o)=>(
                                <tr>
                                    <td>{o._id}</td>
                                    <td>{o.userId?.name}</td>
                                    <td>{new Date(o.createdAt).toLocaleString().split(',')[0]}</td>
                                    <td>{o.totalAmount} (MMK)</td>
                                    <td>{o.isPaid ? new Date(o.paidAt).toLocaleString().split(',')[0]: "Not Paid"}</td>
                                    <td>{o.isDelivered ? new Date(o.deliveredAt).toLocaleString().split(",")[0]:"Not Delivered"}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mr-2" type="submit" onClick={()=>detailHandler(o._id)} style={{display:"inline-block"}}>
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                        <button className="btn btn-danger btn-sm mr-2" type="submit" onClick={()=>deleteHandler(o._id)}  style={{display:"inline-block"}}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                      
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }
            </div>
        </div>
       
        
   </Master>
  )
}

export default OrderLists