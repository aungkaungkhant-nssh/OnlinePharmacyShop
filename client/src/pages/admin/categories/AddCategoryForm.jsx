import React from 'react'
import { useState } from 'react'
import Master from '../layout/Master'
import ValidationErrorMsg from '../../../components/ValidationErrorMsg';
import { Link } from 'react-router-dom';
import classes from '../../../components/InputValidation.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, resetCategorySlice } from '../../../redux/admin/categorySlice';
import { useEffect } from 'react';
import {errorMessage, successMessage} from '../../../util/message'
function AddCategories() {
  const [name,setName] = useState("");
  const dispatch = useDispatch();
  const {status,error,validationErrors} = useSelector(state => state.category);
  useEffect(()=>{
    if(status !== "idle"){
      dispatch(resetCategorySlice());
    }
    if(status === "created succeeded"){
        successMessage("Category Create Successfully");
        setName("");
        dispatch(resetCategorySlice());
    }
    if(error){
      errorMessage(error);
    }
  },[status])
  const registerHandler = (e)=>{
    e.preventDefault();
    dispatch(createCategory({name}));
  }
  return (
   <Master>
     <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-body shadow'>
                <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0">Add Category</h5>
                          <Link to="/admin/lists-user">
                              <i className="fa-solid fa-list mr-2"></i>
                          </Link>
                  </div>
                  <hr />
                  <form onSubmit={registerHandler}>
                          <div className='form-group'>
                              <label htmlFor="">Name</label>
                              <input 
                                   type="text"
                                   className={`form-control ${validationErrors.find((v)=> v.param === "name") && classes.validations}`}
                                   value={name} onChange={(e)=>setName(e.target.value)}/>
                                <ValidationErrorMsg validationErrors={validationErrors} inputField="name"/>
                          </div>
                        
                          <button type='submit' className='btn btn-primary mt-2'>
                          {
                              status === "loading" ?( 
                                  <>
                                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                          <span className='ml-1'>Loading...</span>
                                  </>
                              )
                              :(
                                  'Add Category'
                              )
                          }
                          </button>
                  </form>
              </div>
            </div>
          </div>
      </div>
   </Master>
  )
}

export default AddCategories