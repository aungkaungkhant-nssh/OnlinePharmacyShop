import React, { useEffect, useState } from 'react'
import Master from './layout/Master'
import Logo from '../../assets/images/med1.jpg'
import { Link } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProducts} from '../../redux/products/productsSlice';
import {errorMessage} from '../../util/message';
import {addCartItems} from '../../redux/products/addToCartSlice';
import {useNavigate} from 'react-router-dom';
import Rating from '../../components/Rating';
function Home() {
    const {status,error,products} = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
       if(status === "idle"){
        dispatch(fetchProducts({page:1}));
       }
    },[status,dispatch]);   
    const addToCart = (p)=>{
        dispatch(addCartItems({qty:1,...p}));
        navigate('/cart')
    }
  return (
    <Master>
            <section className="container-fluid home" style={{paddingTop:"10px"}}>
                <div className="container">
                <div className="row align-items-center justify-content-around">
                    <div className="col-12 col-md-6">
                    <div>
                        <h3 className="text-uppercase text-primary">Online pharmacy</h3>
                        <p className="text-black-50">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id fugiat beatae tenetur, commodi voluptas fuga ipsam consectetur officiis omnis voluptate accusantium sint molestiae libero explicabo totam quo saepe eius delectus.
                        </p>
                        <a href="" className="btn btn-primary">Learn More</a>
                    </div>
                    
                    </div>
                    <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <div>
                        <img 
                            src={Logo}  
                            alt="" style={{width:"80%",borderRadius:"50%"}} />
                    </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 mb-5">
                        <div className="d-flex justify-content-between">
                        <div className="">
                            <h3 className="text-black-100">Deal Of The day</h3>
                        </div>
                        <div className="">
                            <Link to='/shop' className='btn btn-primary'>See All</Link>
                        </div>
                        </div>
                    </div> 
                    {
                        status==="loading" ? <LoadingBox />
                        :error ? errorMessage(error)
                        :  products.map((p)=>(
                            <div className="col-12 col-md-4 col-lg-3 mt-3" key={p._id}>
                                    <div className="card shadow">
                                        <div className="card-body text-center">
                                            <img src={p.image} alt="" style={{height:"150px",width:"150px",borderRadius:"50%"}} />
                                            <div className="ratings my-2">
                                                <Rating rating={p.rating} numReviews={p.numReviews}/>
                                            </div>
                                            <h5 className="card-title">{p.name}</h5>
                                            <p>{p.price}(MMK)</p>
                                            <div className='d-flex justify-content-between '>
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
                                            {/* <span className="text-success" style={{fontSize: ".8rem"}}>1500 (MMK)</span>  */}
                                        </div>
                                    </div>
                            </div>
                        ))
                    }
                </div>
                </div>
            </section>
    </Master>
  )
}

export default Home