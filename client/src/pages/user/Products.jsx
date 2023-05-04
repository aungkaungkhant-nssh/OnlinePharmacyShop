import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import { fetchProducts } from '../../redux/products/productsSlice';
import Master from './layout/Master';
import classes from './Products.module.css';
import {errorMessage} from '../../util/message';
import NotFound from '../../assets/images/NotFound.jpg';
import {addCartItems} from '../../redux/products/addToCartSlice';
import {useNavigate} from 'react-router-dom';
import Rating from '../../components/Rating';
function Products() {
    const dispatch = useDispatch();
    const {products,status,error,categories,totalPage,currentPage} = useSelector(state => state.products); 
    const [clickedCategoryId,setClickedCategoryId] = useState(null);
    const [chooseMedicine,setChooseMedicine] = useState('')
    const [time,setTime] = useState();
    const navigate = useNavigate(); 
    useEffect(()=>{
        dispatch(fetchProducts());
    },[]);
   const changePage = (page)=>{
      dispatch(fetchProducts({page}))
   }
   const searchMedicine = (e)=>{
    clearTimeout(time)
    setTime(
      setTimeout(() => {
        let medicine = e.target.value;
        dispatch(fetchProducts({medicine,categoryId:clickedCategoryId}))
        setChooseMedicine(medicine);
      }, 1000)
    )
   }
   const filterCategory = (categoryId)=>{
        setClickedCategoryId(categoryId);
        dispatch(fetchProducts({categoryId,medicine:chooseMedicine}))
   }
   const addToCart = (p)=>{
    dispatch(addCartItems({qty:1,...p}));
    navigate('/cart')
   }
  return (
    <Master>
        <div className="row my-5">
          <div className="col-12  col-lg-3 col-xl-3">
              <div className="mt-3 text-center text-md-left">
                <div className="category-header">
                    <h6 className={`text-primary text-uppercase ${classes.categoryTitle}`} style={{letterSpacing:"2px"}}>Categories</h6>
                    <div className="line"></div>
                </div>
                <ul className={`${classes.categoryLists} mt-4`} style={{padding:"0px"}}>
                    <li className={`${classes.categoryItem} mb-3`}>
                      <span  className={`${clickedCategoryId === null ? 'text-black' :'text-black-50'}`} onClick={(e)=>filterCategory(null)}>All</span>
                    </li>
                    {categories.map((c)=>(
                      <li className={`${classes.categoryItem} mb-3`} key={c._id} onClick={(e)=>filterCategory(c._id)}>
                        <span  className={`${c._id === clickedCategoryId ? 'text-black':'text-black-50'}`}>{c.name}</span>
                      </li>
                    ))}
                </ul>
               
              </div>
          </div>
          <div className="col-12  col-lg-9 col-xl-9 product-container">
            <div className="row">
              <div className="col-12 text-center loading-container" style={{display:"none"}}>
                <div className="loader">Loading...</div>
              </div>
            </div>
            <div className="row mt-3 product-lists">
                <div className="col-12 search-bar" >
                    <form method="post">
                      <div className='form-group'>
                        <input type="text" className='form-control' placeholder='Search Medicine' onChange={(e)=>searchMedicine(e)}/>
                      </div>
                    </form>
                </div>
                {
                  status === "loading" ? <LoadingBox />
                  :error ? errorMessage(error)
                  :products.length === 0 ? (
                    <div className='col-12 my-2 text-center'>
                       <img src={NotFound} alt="" style={{width:"300px"}}/>
                    </div>
                  ):
                  (            
                    products.map((p)=>(
                      <div className="col-12 col-md-6 col-xl-4 col-lg-4  mt-4" key={p._id}>
                          
                            <div className="card shadow text-center text-md-left" style={{borderRadius: "25px !important"}}>
                                <div className="card-body">
                                <div className="text-center mb-3">
                                    <img src={p.image} alt="" style={{height: "180px",width:"80%",borderRadius: "40%"}} />
                                </div>
                                    
                                    <div className="ratings my-2">
                                      <Rating rating={p.rating} numReviews={p.numReviews}/>
                                    </div>
                                    <h5 className="card-title mb-2">{p.name}</h5>
                                    <p>{p.price} (MMK) </p>
                                    <div className='d-flex justify-content-around justify-content-md-between align-items-center'>
                                        <Link to={`/shop/${p._id}`} className="btn btn-warning btn-sm text-white">
                                          <i className="fa-solid fa-eye mr-1" />
                                          Details
                                        </Link>
                                       {
                                        p.numberInstock <=0 ? (
                                          <p className='text-danger mb-0'>Unavailable</p>
                                        ):(
                                          <button className='btn btn-outline-secondary btn-sm' onClick={()=>addToCart(p)}>
                                            <i className="fa-solid fa-cart-arrow-down mr-1" />
                                            Add To Cart
                                          </button>
                                        )
                                       }
                                    </div>
                                </div>
                            </div>
                      </div>

                  ))
                  )
                }
                 
              
                <div className="col-12 mt-5 text-center">
                  <div className="d-flex justify-content-center">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          {
                            currentPage >1 &&(
                              <li className='page-item'>
                                <span className= "page-link"  style={{cursor:"pointer"}} onClick={(e)=>changePage(currentPage-1)}>
                                    <i className="fa-solid fa-chevron-left"></i>
                                </span>
                              </li>
                            )
                          }
                          {
                            [...new Array(totalPage).keys()].map((n)=>(
                              <li className={`page-item ${n+1 === currentPage && 'active'}`} key={n} style={{style:"cursor-pointer"}}>
                                  <span className="page-link nextPage" style={{cursor:"pointer"}} onClick={(e)=>changePage(n+1)}>
                                    {n+1}
                                  </span>
                              </li>
                            ))
                          }
                          {
                            currentPage<totalPage && (
                              <li className="page-item">
                                  <span className='page-link'  style={{cursor:"pointer"}} onClick={(e)=>changePage(currentPage+1)}>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </span>
                              </li>
                            ) 
                          }   
                           
                        </ul>
                      </nav>
                  </div>
                </div>
            </div>   
          </div>
      </div>
     
    </Master>
  )
}

export default Products