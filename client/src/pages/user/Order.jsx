import React, { useEffect } from 'react'
import Master from './layout/Master'
import AdminMaster from '../admin/layout/Master';
import {Link, useLocation, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import OrderDetail from '../../components/OrderDetail';

function Order() {
  // const {order,status,error} = useSelector(state => state.orderCreate);
  const {pathname} = useLocation();
  
  if(pathname.includes("admin")){
    return(
        <AdminMaster>
            <OrderDetail />
        </AdminMaster>
    )
  }else{
    return(
        <Master>
            <OrderDetail />
        </Master>
    )
  }
  
}

export default Order