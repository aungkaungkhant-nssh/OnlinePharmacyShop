import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories ,deleteCategory, resetCategorySlice} from '../../../redux/admin/categorySlice';
import Master from '../layout/Master';
import LoadingBox from '../../../components/LoadingBox';
import {errorMessage, successMessage} from '../../../util/message';
//Datatable Modules
import DataTable from '../../../components/DataTable';

function CategoryLists() {
    const dispatch = useDispatch();
    const {categories,status,error} = useSelector(state => state.category);
    useEffect(()=>{
      dispatch(resetCategorySlice());
      dispatch(fetchCategories());
      
    },[]);
    const deleteHandler = (id)=>{
      dispatch(deleteCategory({id}));
     
    }
    
    useEffect(()=>{
      if(status === "delete succeeded"){
        successMessage("Category Deleted Successfully");
        dispatch(resetCategorySlice());
      }
    
    },[status])
  return (
    <Master>
    
        {
          status === "loading" 
          ?  <LoadingBox />
          : error ? errorMessage(error)
          :(
            <DataTable data={categories} deleteHandler={deleteHandler} handleUpdateRole={''}/>
          ) 
        }
        
    </Master>
  )
}

export default CategoryLists