import React from 'react'
import classes from './Master.module.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../../redux/admin/authSlice';
import { getBreadCrumb } from '../../../util/breadcrumb';
import { capitalizeFirstLetter } from '../../../util/string';

function Content({children,openSidebar}) {
  const {adminAuthUser} = useSelector(state => state.adminAuth);
  const dispatch  = useDispatch();
  const naviagte = useNavigate();
  const {pathname} = useLocation();
  const handleLogout = (e)=>{
    dispatch(adminLogout());
    naviagte('/admin/login');
  }
 
  
  return (
    <div className={`col-lg-9 col-xl-10 ${classes.content}`}>
        <div className={`row  mb-2 ${classes.header}`}>
            <div className="col-12">
                <div className="d-flex bg-primary p-2 align-items-center justify-content-between">
                    <button className="btn btn-primary d-lg-none d-block show-sidebar" onClick={openSidebar}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <form action="" className="d-lg-block d-none">
                        <div className="form-inline">
                            <input type="text" className="form-control mr-2" />
                            <button className="btn btn-light">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </form>
                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={`${adminAuthUser.image}`} alt={adminAuthUser.name} className={classes.userimage} /> 
                            <span>{adminAuthUser.name}</span>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton ">
                        <Link to="/admin/account-settings" className="dropdown-item d-flex justify-content-between align-items-center" style={{cursor: "pointer"}}>
                            Profile
                            <i className="fa-solid fa-angle-right"></i>
                        </Link>
                        
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item d-flex justify-content-between align-items-center" style={{cursor: "pointer"}} onClick={handleLogout}>
                            <span>Logout</span>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            pathname !== "/admin/account-settings" && pathname!== "/admin/order-lists" && !pathname.includes("/admin/order") && !pathname.includes('/admin/dashboard') && !pathname.includes('/lower-products')&&(
                <div className="row my-3">
                <div className="col-12">
                    <nav aria-label="breadcrumb" className="bg-white mb-4">
                        <ol className="breadcrumb" >
                            <li className="breadcrumb-item">
                                {
                                    getBreadCrumb(pathname).map((b,i,arr)=>(
                                       <Link to={`/admin${b.bpath}`}>{capitalizeFirstLetter(b.bname)} {i!==arr.length-1 && ' / '}</Link>
                                    ))
                                }
                               
                             
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            )
        }
       
        <div className='row '>
            <div className='container'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Content