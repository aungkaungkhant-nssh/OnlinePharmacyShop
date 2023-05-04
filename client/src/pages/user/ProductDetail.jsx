import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingBox from '../../components/LoadingBox';
import { addProductReview, fetchProduct } from '../../redux/products/productSlice';
import { errorMessage } from '../../util/message';
import Master, { LoginFormContext } from './layout/Master'
import {useSelector,useDispatch} from 'react-redux';
import { addCartItems } from '../../redux/products/addToCartSlice';
import { startOrderItems } from '../../redux/orders/createOrderSlice';
import Rating from '../../components/Rating';
import classes from './ProductDetail.module.css';
import { format, formatDistance,parseISO } from 'date-fns';
import {Spinner} from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
function ProductDetail() {
    let params = useParams();
    const {status,error,product} = useSelector(state => state.product);
    const {authUser} = useSelector(state =>state.auth);
    const [qty,setQty] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rating,setRating] = useState(0);
    const [modalShow,setModalShow]= useState(false);
    const [comment,setComment] = useState("");
    useEffect(()=>{    
        dispatch(fetchProduct(params.id))
        
    },[dispatch,params.id]);
    const addToCart = async()=>{
        if(!authUser?.token){
           return navigate('/login');
        }
        dispatch(addCartItems({qty,...product}));
        navigate('/cart')
    }
   const startOrder =()=>{
        dispatch(addCartItems({qty,...product}));
        navigate("/shipping?start_order=true");
   }

   const submitReviewHandler = (e)=>{
    e.preventDefault();
    const reviewsData = {_id:product._id,name:authUser.name,image:authUser.image,comment,rating}
    dispatch(addProductReview(reviewsData));
   
   }
   
  
  return (
    <Master>
        {
            status==="loading" ? <LoadingBox />
            :error ? errorMessage(error)
            : ( product.image && (
                <>
                     <section className="product-detail my-5">
                        <div className="container">
                            <div className="row text-center text-lg-left">
                                <div className='col-lg-4 col-12'>
                                    <div>
                                        <img src={product.image} alt="" style={{width:"60%"}}/>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-12'>
                                    <div>
                                        <h3>{product.name}</h3>
                                        
                                        <div className="ratings my-2">
                                            <Rating rating={product.rating} />
                                        </div>
                                        <p className='mb-2'>Price: <span className='text-black-50'>{product.price} (MMK)</span></p>
                                        <p className='mb-2'>Description: <span className='text-black-50'>{product.description}</span></p>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-12 mt-lg-0 mt-3'>
                                    <div>
                                        <div className='card shadow'>
                                            <div className='card-body'>
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <p>Price</p>
                                                    <p>{product.price} (MMK)</p>
                                                </div>
                                            
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <p>Status</p>
                                                    {
                                                        product.numberInstock > 0 ?(
                                                            <p className="text-success">Instock</p>
                                                        ):(<p className='text-danger'>Unavailable</p>)
                                                    }
                                                </div>
                                                {
                                                    product.numberInstock > 0 && (
                                                        <>
                                                            <div className='d-flex align-item-center justify-content-between'>
                                                                <p>Quantity</p>
                                                                <select value={qty}  id=""  onChange={e => setQty(e.target.value)}>
                                                                    {
                                                                        [...new Array(product.numberInstock).keys()].map((q,i)=>(
                                                                            <> 
                                                                                <option value={q+1} key={i}>{q+1}</option>
                                                                            </>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className='mt-3 d-flex justify-content-between'>
                                                                <button className='btn btn-warning text-white btn-sm' onClick={addToCart}>
                                                                    <i className="fa-solid fa-cart-arrow-down mr-1"></i>
                                                                    Add To Cart
                                                                </button>
                                                                <button className='btn btn-outline-secondary btn-sm' onClick={startOrder}>
                                                                    <i className="fa-solid fa-file-circle-plus mr-1"></i>
                                                                    Start Order
                                                                </button>
                                                                
                                                            </div>
                                                        </>
                                                        
                                                    )
                                                }
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </section>
                            <div>
                                 { 
                                    <>
                                        <h3 className='mb-4'>Reviews</h3>
                                        <div>
                                            <ul className={classes.reviewsContainer}>
                                                {
                                                    product.reviews.map((review)=>(
                                                        <>
                                                            <li>
                                                                <div className='d-flex align-items-center'>
                                                                    <div className='mr-5'>
                                                                        <div className='d-flex justify-content-center align-items-center'>
                                                                            <img src={review.image} style={{width:"70px",borderRadius:"100%"}} className="mr-3" />
                                                                            <div>
                                                                                <p className='mb-1 font-weight-bolder'>{review.name}</p>
                                                                                <Rating rating={review.rating} numReviews={0}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                
                                                                    <div>
                                                                        <p className='text-black-100 mb-0 badge badge-primary' style={{fontSize:".9rem"}}>
                                                                        {formatDistance(new Date(review.createdAt),new Date())}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <p className='mt-3 text-black-50'>{review.comment}</p>
                                                            </li>
                                                            <hr />
                                                        </>
                                                    
                                                    ))
                                                }
                                            
                                            
                                            </ul>
                                        
                                        
                                        </div>
                                    </>
                                    
                                }
                                {
                                   authUser && Number(product.reviews.findIndex((r)=>r.name === authUser.name)) < 0 && (
                                        <>
                                            <button onClick={() => setModalShow(true)} className="btn btn-outline-secondary btn-block">
                                                 Write a Review
                                            </button>
                                            <Modal
                                                size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                                show={modalShow}
                                                onHide={()=>setModalShow(false)}
                                            >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Write a Review
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                    
                                                    <form onSubmit={submitReviewHandler}>
                                                            <div className='form-group'>
                                                                <textarea name="" id="" className='form-control' placeholder='Reviews' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                                                            </div>
                                                            <div className='form-group'>
                                                                <select value={rating} className='form-control' onChange={(e)=>setRating(e.target.value)}>
                                                                    <option value="">Select Rating....</option>
                                                                    <option value="1">1- Poor</option>
                                                                    <option value="2">2- Fair</option>
                                                                    <option value="3">3- Good</option>
                                                                    <option value="4">4- Very good</option>
                                                                    <option value="5">5- Excelent</option>
                                                                </select>
                                                            </div>
                                                            <button className='btn btn-primary btn-block' type='submit'  >
                                                            {
                                                                status=="addProductReview loading" ? <Spinner
                                                                as="span"
                                                                animation="grow"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                                /> : 'Add Review'
                                                            }
                                                            </button>
                                                    </form>
                                                
                                            </Modal.Body>
                                            </Modal>
                                        </>
                                     )
                                }
                                
                            </div>
                    
                    
                </>
               
            )    
            )
        }
    
    </Master>
  )
}

export default ProductDetail