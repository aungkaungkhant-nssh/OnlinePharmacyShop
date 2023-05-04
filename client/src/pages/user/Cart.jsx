import React, { useEffect } from 'react'
import Master from './layout/Master'
import { useDispatch, useSelector } from 'react-redux';
import { cartItemQtyIncrease, clearWarning,cartItemQtyDecrease,cartItemDelete, resetWarning} from '../../redux/products/addToCartSlice';
import { warningMessage } from '../../util/message';
import CartVector from '../../assets/images/cart.jpg'
import { Link, useNavigate } from 'react-router-dom';
function Cart() {
 let {cartItems,warning} = useSelector(state => state.addToCart);
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const increaseQuantity = (id)=>{
    dispatch(clearWarning());
    dispatch(cartItemQtyIncrease(id));

 }
 if(warning){
    warningMessage(warning);
    dispatch(resetWarning());
 }

 const descreaseQuantity = (id)=>{
    dispatch(clearWarning());
    dispatch(cartItemQtyDecrease(id));
 }
 
 
  return (
    <Master>
        <div className='row align-items-start mt-4'>
            {
                cartItems.length ===0 ? (
                    <div className='col-12 text-center'>
                        <div>
                                <img src={CartVector} alt="" style={{width:"35%",borderRadius:"100%"}}/>
                                <h5 className='text-black-50 mb-3'>No Items Not Found</h5>
                                <Link to="/shop" className='btn btn-outline-primary'>Continue to shopping <i class="fa-solid fa-angles-right"></i></Link>
                        </div>
                    </div>
                ) :(
                  <>
                    <div className='col-12 col-lg-8'>
                    <div>
                    {
                    cartItems.map((c)=>(
                        <>
                            <div className='row align-items-center'>
                                <div className='col-6 col-md-4 text-center text-md-left'>
                                    <img src={c.image}  alt="" style={{width:"100px"}}/>
                                    <span className='mb-0 ml-2 text-black-50'>{c.name}</span>
                                </div>
                                <div className='col-6 col-md-4 mt-3 mt-md-0'>
                                    <button className='btn btn-light' onClick={()=>descreaseQuantity(c._id)}>
                                        <i class="fa-solid fa-minus text-black-50"></i>
                                    </button>
                                        <span className='mx-3'>{c.qty}</span>
                                   <button className='btn btn-light' onClick={()=>increaseQuantity(c._id)}>
                                        <i class="fa-solid fa-plus text-black-50"></i>
                                   </button>
                                </div>
                                <div className='col-12 col-md-4 text-center'>
                                    <span className='text-black mb-0 mr-3'>{c.price} (MMK)</span>
                                    <span className='btn btn-danger' onClick={()=>dispatch(cartItemDelete(c._id))}>
                                        <i class="fa-solid fa-xmark"></i>
                                    </span>
                                </div>
                        
                            </div>
                            <hr />
                        </>
                    ))}
                   
                    
                </div>
                     </div>
                    <div className='col-12 col-lg-4'>
                        <div>
                            <div className='card'>
                                <div className='card-body shadow'>
                                    <p className='text-dark'>SubTotal ({cartItems.length} Items) : 
                                        <span className='text-black-50'>{cartItems.reduce((p,c)=>p+(c.qty*c.price),0)}(MMK)</span>
                                    </p>
                                    <button className='btn btn-primary btn-block' onClick={()=>navigate('/shipping')}>Proceed To CheckOut</button>
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

export default Cart



