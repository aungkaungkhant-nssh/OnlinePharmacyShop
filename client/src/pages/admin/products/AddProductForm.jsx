import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import Master from '../layout/Master';
import {Link,useNavigate,useSearchParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {errorMessage, successMessage} from '../../../util/message';
import { createProductForAdminPannel, fetchProductsForAdminPannel, resetProductsSlice, updateProductForAdminPannel } from '../../../redux/admin/productsSlice';
import { resetProductSlice } from '../../../redux/products/productSlice';
import { fetchProduct } from '../../../redux/products/productSlice';
import LoadingBox from '../../../components/LoadingBox';
import ValidationErrorMsg from '../../../components/ValidationErrorMsg';
import classes from '../../../components/InputValidation.module.css'
import axios from 'axios';
function AddProductForm() {
  const {status:editStatus,product,error} = useSelector(state => state.product);
  const [name,setName] = useState("");
  const [categoryId,setCategoryId] = useState("");
  const [price,setPrice] = useState("");
  const [numberInstock,setnumberInstock] = useState("");
  const [image,setImage] = useState("");
  const [description,setDescription]= useState("");
  const dispatch = useDispatch();
  const {categories,status,validationErrors} = useSelector(state => state.adminPannelProduct);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isEdit,setIsEdit] = useState(false);
  const productId = searchParams.get("productId");
  const selectImage = useRef();

  useEffect(()=>{
  
    setIsEdit(searchParams.get("edit") || false);
    dispatch(resetProductSlice());
    dispatch(fetchProductsForAdminPannel());
  },[searchParams]);
  
  useEffect(()=>{
    if(!isEdit){
      setName("");
      setCategoryId("");
      setPrice("");
      setnumberInstock("");
      setImage("");
      setDescription("");
    }
    if(productId  && editStatus==="idle"){
      dispatch(fetchProduct(productId));
    }
   
    if(status === "create succeeded") {
      successMessage("Create Product Successfully");
      setName("");
      setCategoryId("");
      setPrice("");
      setnumberInstock("");
      setImage("");
      selectImage.current.value = null
      setDescription("");
      dispatch(resetProductsSlice());
   }
   if(status === "Update succeeded"){
      successMessage("Update Product Successfully");
      setName("");
      setCategoryId("");
      setPrice("");
      setnumberInstock("");
      setImage("");
      setDescription("");
      selectImage.current.value = null
      dispatch(resetProductsSlice());
      navigate('/admin/lists-product');
   }
   if(editStatus === "succeeded"){
      setName(product.name);
      setPrice(product.price);
      setCategoryId(product.categoryId)
      setnumberInstock(product.numberInstock);
      setImage(product.image)

      setDescription(product.description)
    }
  },[status,productId,editStatus,isEdit])

  const submitHandler = async(e)=>{
    e.preventDefault();
    let photo
    if(image){
      const data = new FormData();
      data.append("file",image)
      data.append("upload_preset","onlinepharmacyshop");
      data.append("cloud_name","dqlplxvtx");
      photo = await axios.post("https://api.cloudinary.com/v1_1/dqlplxvtx/image/upload",data)
    }
  
    if(isEdit){
      dispatch(updateProductForAdminPannel({id:productId,name,categoryId,price,numberInstock,image:photo?.data.url || "",description}));
      return;
    }
  
    dispatch(createProductForAdminPannel({name,categoryId,price,numberInstock,image:photo?.data.url || "",description}))
  }

  const choooseUserimage = (e)=>{
    setImage(e.target.files[0]);
  }
 
  return (
    <Master>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-body shadow'>
                <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0">{!isEdit ? "Add" : "Edit"} Product</h5>
                          <Link to="/admin/lists-user">
                              <i className="fa-solid fa-list mr-2"></i>
                          </Link>
                  </div>
                  <hr />
                  {
                    editStatus=== "loading" && isEdit ? <LoadingBox></LoadingBox>
                    : error ? errorMessage(error)
                    :(
                      <form onSubmit={submitHandler}>
                        <div className='form-group'>
                            <label htmlFor="">Name</label>
                            <input 
                              type="text" 
                              className={`form-control ${validationErrors.find((v)=> v.param === "name") && classes.validations}`}
                              value={name} 
                              onChange={(e)=>setName(e.target.value)} />
                            <ValidationErrorMsg validationErrors={validationErrors} inputField="name"/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Price</label>
                            <input 
                                type="text" 
                                className={`form-control ${validationErrors.find((v)=> v.param === "price") && classes.validations}`}
                                value={price}
                                 onChange={(e)=>setPrice(e.target.value)} />
                            <ValidationErrorMsg validationErrors={validationErrors} inputField="price"/>
                        </div>
                        <div className='form-group'>
                          <label htmlFor="">Select Category</label>
                          <select 
                              value={categoryId}
                              className={`form-control ${validationErrors.find((v)=> v.param === "categoryId") && classes.validations}`}
                              onChange={(e)=>setCategoryId(e.target.value)}>
                            <option value="">Select Category</option>
                            {
                              categories.map((c)=>(
                                <option value={c._id} key={c._id}>{c.name}</option>
                              ))
                            }
                          </select>
                          <ValidationErrorMsg validationErrors={validationErrors} inputField="categoryId"/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Number Instock</label>
                            <input 
                                type="number" 
                                className={`form-control ${validationErrors.find((v)=> v.param === "numberInstock") && classes.validations}`} 
                                value={numberInstock} 
                                onChange={(e)=>setnumberInstock(e.target.value)} />
                            <ValidationErrorMsg validationErrors={validationErrors} inputField="numberInstock"/>
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="">Select Image</label>
                          <input type="file" className="form-control" onChange={choooseUserimage} ref={selectImage}/>
                          <ValidationErrorMsg validationErrors={validationErrors} inputField="image"/>
                        </div>
                        {
                          isEdit && image && typeof image==="string" && (
                            <div className='form-group mb-2'>
                              <img  src={image} alt="" style={{width:"20%",height:"20%"}} />
                            </div>
                          )
                        }
                       
                        <div className="form-group mb-2">
                          <label htmlFor="">Description</label>
                          <textarea  
                              cols="10" 
                              rows="5" 
                              className={`form-control ${validationErrors.find((v)=> v.param === "description") && classes.validations}`} 
                              value={description} 
                              onChange={(e)=>setDescription(e.target.value)}></textarea>
                          <ValidationErrorMsg validationErrors={validationErrors} inputField="description"/>
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
                                `${!isEdit ? "Add" : "Update"} Product`
                            )
                        }
                        </button>
                      </form>
                    )
                  }
                  
                 
              </div>
            </div>
          </div>
      </div>
    </Master>
  )
}

export default AddProductForm