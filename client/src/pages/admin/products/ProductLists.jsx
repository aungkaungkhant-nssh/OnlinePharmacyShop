import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Master from '../layout/Master';
import { errorMessage, successMessage } from '../../../util/message';
import DataTable from '../../../components/DataTable';
import LoadingBox from '../../../components/LoadingBox'
import { deleteProductForAdminPannel, fetchProductsForAdminPannel, resetProductsSlice } from '../../../redux/admin/productsSlice';
function ProductLists() {
  const dispatch = useDispatch();
  const {products,status,error} = useSelector(state =>state.adminPannelProduct)

  useEffect(()=>{
    dispatch(resetProductsSlice());
    dispatch(fetchProductsForAdminPannel());
  },[]);
  const deleteHandler = (id)=>{
    dispatch(deleteProductForAdminPannel(id));
   
  }
  
  useEffect(()=>{
    if(status === "Delete succeeded"){
      successMessage("Product Deleted Successfully");
      dispatch(resetProductsSlice());
    }
   
  },[status])
  
  return (
    <Master>
      
     {
        status === "loading" 
        ? <LoadingBox></LoadingBox>
        : error ? errorMessage(error)
        : (
          <DataTable data={products} deleteHandler={deleteHandler} />
        )
      }
    </Master>
  )
}

export default ProductLists