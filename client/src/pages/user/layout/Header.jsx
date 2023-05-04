import React, { useState } from 'react'
import classes from './Master.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {DropdownButton,Dropdown} from 'react-bootstrap'
import { userLogout,resetAuthSlice } from '../../../redux/auth/authSlice'
import { resetProductsSlice } from '../../../redux/products/productsSlice'
import {successMessage} from '../../../util/message';
import {Link, useLocation, useNavigate} from 'react-router-dom';
function Header() {
  const {authUser,status} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const handleClick = (e)=>{
      e.preventDefault();
      dispatch(userLogout());
  }
  if(status === "user logout success"){
    dispatch(resetAuthSlice())
    successMessage("User Logout Successfully")
  }
  return (
    <header className={classes.navHeader}>
      <nav className="navbar navbar-expand-lg navbar-light p-2 bg-white shadow">
      <div className="container">
          <a className="navbar-brand text-black-100 mb-0" href="#" style={{fontSize:"1.5rem",padding:"0.8rem"}}>
          MyatThueKha <span className="text-primary" style={{fontSize:"1rem"}}>(MedicineShop)</span>
          </a>
          <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto align-items-xl-center">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${pathname==="/" && 'text-primary'}`} onClick={()=>dispatch(resetProductsSlice())}>
                    Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop" className={`nav-link ${pathname==="/shop" && 'text-primary'}`}>
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className={`nav-link ${pathname==="/cart" && 'text-primary'}`}>
                  Cart
                </Link>
              </li>
              {
                !authUser?.token ? (
                  <>
                    <li className="nav-item login">
                        <Link to='/login' className={`nav-link ${pathname==='/login' && 'text-primary'}`}>Login</Link>
                    </li>
                      <li className="nav-item register">
                         <Link to='/register' className={`nav-link ${pathname==='/register' && 'text-primary'}`}>Register</Link>
                      </li>
                  </>
                ):(
                  <>
                    <li className="nav-item order">
                        <Link to='/order' className={`nav-link ${pathname==="/order" && 'text-primary'}`}>Order</Link>
                    </li>
                    <DropdownButton
                        variant="outline-secondary"
                        title={
                            <>
                              <img src={authUser.image} alt="" className={`mr-2 ${classes.userImage}`} />
                              {authUser.name}
                            </>
                        }
                        id="input-group-dropdown-2"
                        align="end"
                      >
                      <Dropdown.Item onClick={()=>navigate("/profile/account-settings")}>Profile</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleClick}>Logout</Dropdown.Item>
                    </DropdownButton>
                    
                  </>
                
                )
              }
          </ul>
          </div>
      </div>
      </nav>
   
    </header>
  )
}

export default Header

