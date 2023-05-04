import React from 'react'
import Master from '../layout/Master';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import LoadingBox from '../../../components/LoadingBox';
import {errorMessage} from '../../../util/message';
import { Link } from 'react-router-dom';
import { fetchLowerNumberInstockProducts, resetLowerProductsSlice } from '../../../redux/admin/lowerProductsSlice';
function LowerProductLists() {
  const dispatch = useDispatch();
  const {status,error,lowerNumberInstockProductLists} = useSelector(state => state.lowerProducts);
  useEffect(()=>{
    dispatch(fetchLowerNumberInstockProducts());
    $(document).ready(function () {
      setTimeout(function(){
      $('#lowerproductlists').DataTable();
      } ,1000);
    })
    return ()=> dispatch(resetLowerProductsSlice());
  },[])

  return (
      <Master>
          {
            status === "loading" ? <LoadingBox />
            :error ? errorMessage(error)
            :(
             <div className='row'>
              <div className='col-12 mt-4'>
                <div>
                  <table id="lowerproductlists"  className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>NumberIntock</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          lowerNumberInstockProductLists.map((p)=>(
                            <tr>
                              <td><img src={p.image} alt="" style={{width:"70px",borderRadius:"50%"}} /></td>
                              <td>{p.name}</td>
                              <td>
                                {
                                  p.numberInstock === 0 ? <span className='badge badge-danger'>Empty</span>
                                  :p.numberInstock
                                }
                              </td>
                              <td>
                                <Link to={`/admin/edit-product?edit=true&productId=${p._id}`} className='btn btn-warning btn-sm mr-2 text-white'>
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </Link>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                  </table>
                </div>
              </div>
             </div>
            )
          }
      </Master>
  )
}

export default LowerProductLists