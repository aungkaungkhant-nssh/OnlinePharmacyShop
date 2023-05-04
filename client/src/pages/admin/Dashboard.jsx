import React from 'react'
import { useEffect } from 'react'
import Master from './layout/Master';
import {useDispatch, useSelector} from 'react-redux'
import { fetchLowerNumberInstockProducts } from '../../redux/admin/lowerProductsSlice';
import {Link} from 'react-router-dom';
import classes from './Dashboard.module.css'
import { fetchDashboardData } from '../../redux/admin/dashboardSlice';

import {
  Line
} from 'react-chartjs-2';
function Dashboard() {
  const dispatch = useDispatch();
  const {status,error,lowerNumberInstockProductLists} = useSelector(state =>state.lowerProducts);
  const {status:dashboardStatus,error:dashboardError,dashboardData}= useSelector(state =>state.dashboard);
  useEffect(()=>{
    dispatch(fetchLowerNumberInstockProducts());
    dispatch(fetchDashboardData());
  },[]);  

  return (
    <Master>
        <div className='row'>
         
          {
            dashboardStatus === "succeeded" && (
              <>
                   <div className='col-12 my-3'>
                <div className='row align-item-center'>
                  <div className='col-12 col-md-3'>
                    <div className={`card ${classes.statusCard}`}>
                      <div className="card-body">
                          <div className="row align-items-center">
                              <div className="col-3 mr-1">
                                  <i className="fa-solid fa-bag-shopping text-primary" style={{fontSize:'2.5rem'}}></i>
                              </div>
                              <div className="col-8">
                                  <p className="mb-1 font-weight-bolder h6">Total Order</p>
                                  <p className="mb-0 font-black-50">
                                      <span className="counter-up">{dashboardData.order.length>0 ? dashboardData.order[0].numOrder : 0 }</span>
                                  </p>
                              </div>
                          </div>
                      </div>
                    </div> 
                  </div>
                  <div className='col-12 col-md-3'>
                    <div className={`card ${classes.statusCard}`}>
                      <div className="card-body">
                          <div className="row align-items-center">
                              <div className="col-3 mr-1">
                                <i className="fa-solid fa-user mr-1 text-primary" style={{fontSize:"2.5rem"}}></i>
                              </div>
                              <div className="col-8">
                                  <p className="mb-1 font-weight-bolder h6">Total Users</p>
                                  <p className="mb-0 font-black-50">
                                      <span className="counter-up">{dashboardData?.user[0] && dashboardData.user[0].numUsers}</span>
                                  </p>
                              </div>
                          </div>
                      </div>
                    </div> 
                  </div>
                  <div className='col-12 col-md-3'>
                    <div className={`card ${classes.statusCard}`}>
                      <div className="card-body">
                          <div className="row align-items-center">
                              <div className="col-3 mr-1">
                                  <i className="fa-solid fa-book-medical mr-2 text-primary" style={{fontSize:"2.5rem"}}></i>
                              </div>
                              <div className="col-8">
                                  <p className="mb-1 font-weight-bolder h6">Total Items</p>
                                  <p className="mb-0 font-black-50">
                                      <span className="counter-up">{dashboardData?.products[0] && dashboardData.products[0].numProducts}</span>
                                  </p>
                              </div>
                          </div>
                      </div>
                    </div> 
                  </div>
                  <div className='col-12 col-md-3'>
                    <div className={`card ${classes.statusCard}`}>
                      <div className="card-body">
                          <div className="row align-items-center">
                              <div className="col-3 mr-1">
                                  <i className="fa-solid fa-user-shield mr-1 text-primary" style={{fontSize:"2.5rem"}}></i>
                              </div>
                              <div className="col-8">
                                  <p className="mb-1 font-weight-bolder h6">Total Admin</p>
                                  <p className="mb-0 font-black-50">
                                      <span className="counter-up">{dashboardData.admin[0].numAdmin}</span>
                                  </p>
                              </div>
                          </div>
                      </div>
                    </div> 
                  </div>
                </div>
              </div>
           
              <div className='col-12 my-4'>
                <div className='row'>
                  <div className='col-12 col-md-8'>
                      <Line data={{
                        labels:[...dashboardData.dailyOrder.map((d)=>d._id)],
                        datasets:[
                            {
                              label:'Daily Order',
                              data:[...dashboardData.dailyOrder.map((d)=>d.sales)],
                              backgroundColor: [
                                '#007bff30',
                              ],
                              borderColor: [
                                  '#007bff',
                              ],
                              borderWidth: 1,
                          },
                          ],
                          options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                },
                              xAxes:[
                                  {
                                      display:true,
                                      gridLines:[
                                          {
                                              display:false
                                          }
                                      ]
                                  }
                              ],

                            },
                            legend:{
                            position: 'top',
                                labels:{
                                  fontColor: "#333",
                                  usePointStyle:"circle"
                                }
                              }
                        }
                    }}/>
                  </div>
                  <div className='col-12 col-md-4'>
                      <div className='card'>
                        <div className='card-body shadow'>
                          {
                            lowerNumberInstockProductLists.length < 0  && 
                              <div>
                                 <h6 className='text-center'>Don't have lowerNumber Instock Item</h6>
                              </div>
                            
                          }
                            <div className='d-flex justify-content-between'>
                              <h6>Decrease Number Instock</h6>
                              <Link to="/admin/lower-products">See All</Link>
                            </div>
                            <div className='py-2'>
                              {
                                lowerNumberInstockProductLists.length>0 && (
                                  lowerNumberInstockProductLists.slice(0,3).map((l)=>(
                                    <div class="d-flex justify-content-between alin-items-center bg-light p-3 mb-2">
                                      <div>
                                          <div className='d-flex align-item-center'>
                                            <img src={l.image} alt="" style={{width:'50px',height:'50px',borderRadius:"100%"}} />
                                            <div className='ml-3'>
                                                <span class="font-weight-bolder">{l.name}</span>
                                                <p className='text-black-50 mb-0'>Hello World</p>
                                            </div>
                                          </div>
                                        
                                      </div>
                                      <div>
                                        <span className='badge badge-danger'>{l.numberInstock}</span>
                                      </div>
                                  </div>
                                  ))
                                )
                              }
                                {
                                  
                                }
                             
                            </div>
                        </div>
                      </div>
                  </div>
                  <div className='col-12 my-5'>
                    <div>
                     <div className='d-flex justify-content-between mb-3 mx-4 align-items-center'>
                              <h5 className='font-weight-bolder'>Latest Order</h5>
                              <Link to="/admin/order-lists" className='btn btn-primary'>See All</Link>
                      </div>
                      <table id="orderLists" className="table table-hover table-bordered" >
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>USER</th>
                              <th>DELIVERED</th>
                              <th>TOTAL</th>
                          </tr>
                      </thead>
                      <tbody>
                            {
                              dashboardData.latestOrder.map((l)=>(
                                <tr>
                                    <td>{l._id}</td>
                                    <td>
                                      <img src={l.userId?.image} alt="" style={{width:'50px',height:'50px',borderRadius:"100%"}}  />
                                      <span className='ml-3'>{l.userId?.name}</span>
                                    </td>
                                    <td>{l?.isDelivered ? <span className='text-success'>{new Date(l.deliveredAt).toLocaleString().split(",")[0]}</span>:<span className='text-danger'>Not Delivered</span>}</td>
                                    <td>{l?.totalAmount} (MMK)</td>
                                </tr>
                              ))
                            }
                          
                      </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              </>
             
           )
          }
        </div>
    </Master>
  )
}

export default Dashboard