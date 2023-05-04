import React, { useState } from 'react';
import classes from './Master.module.css';
import {Link, useLocation} from 'react-router-dom';
function Sidebar({mobileShowSidebar,hideSidebar}) {
  const {pathname} = useLocation();
  return (      
    <div className={`col-lg-3 col-xl-2 ${classes.sidebar} ${mobileShowSidebar && classes.show} p-3`}>
        <div className="d-flex justify-content-between " style={{backgroundColor: '#f3f3f3'}}>
            <div className="d-flex  align-items-center p-2 rounded" >
                <span style={{cursor: "pointer"}} className="text-white bg-primary rounded p-2 d-flex align-items-center justify-content-center mr-3"><i className="fa-solid fa-syringe"></i></span>
                <span className="font-weight-bolder text-dark">MyatThueKha</span>
            </div>
            <button className="btn bn-primary d-lg-none d-block hide-sidebar" onClick={hideSidebar}>
                <i className="fa-solid fa-xmark"></i>
            </button>

        </div>
        <div className={`${classes.navMenu} mt-4`}>
            <ul className='p-1'>
                <li className="menu-item d-flex">
                    <Link to="/admin/dashboard" className={pathname=="/admin/dashboard" && classes.active}>
                        <i className="fa-solid fa-align-center mr-2"></i>
                        Dashboard
                    </Link>
                </li>
                <hr/>
                <li className="menu-item">
                    <a  data-toggle="collapse" href="#ad" role="button" aria-expanded="true" aria-controls="collapseExample">
                        <i className="fa-solid fa-user-shield mr-1"></i>  Admin
                    </a>
                    <ul className="collapse p-1" id="ad">
                        <li className="menu-item d-flex py-3">
                            <Link to="/admin/add-admin" className={`${pathname=="/admin/add-admin" && classes.active}`}>
                                <i className="fa-solid fa-circle-plus mr-2"></i>
                                Add Admin
                            </Link>
                        </li>
                        
                        <li className="menu-item d-flex ">
                            <Link to="/admin/lists-admin" className={pathname=="/admin/lists-admin" && classes.active}><i className="fa-solid fa-list mr-2"></i>Admin Lists</Link>
                        </li>
                    </ul>
                </li>
                <hr />
                <li className="menu-item">
                    <a className="" data-toggle="collapse" href="#us" role="button" aria-expanded="true" aria-controls="collapseExample">
                        <i className="fa-solid fa-user mr-1"></i> User
                    </a>
                <ul className="collapse p-1" id="us">
                    <li className="menu-item d-flex py-3">
                        <Link to="/admin/add-user" className={pathname=="/admin/add-user" && classes.active}>
                            <i className="fa-solid fa-circle-plus mr-2"></i>
                            Add User
                        </Link>
                    </li>
                    <li className="menu-item d-flex">
                        <Link to="/admin/lists-user" className={pathname=="/admin/lists-user" && classes.active}><i className="fa-solid fa-list mr-2"></i>User Lists</Link>
                    </li>
                </ul>
                </li>
                <hr />
                <li className="menu-item">
                    <a className="" data-toggle="collapse" href="#pd" role="button" aria-expanded="false" aria-controls="collapseExample">
                        <i className="fa-solid fa-book-medical mr-2"></i> Products
                    </a>
                <ul className="collapse p-1" id="pd">
                    <li className="menu-item d-flex py-3">
                        <Link to="/admin/add-category" className={pathname=="/admin/add-category" && classes.active}>
                            <i className="fa-solid fa-arrows-to-dot mr-2"></i>
                            Add Category
                        </Link>
                    </li>
                    <li className="menu-item d-flex  py-3">
                        <Link to="/admin/add-product" className={pathname==="/admin/add-product" && classes.active}>
                            <i className="fa-solid fa-circle-plus mr-2"></i>
                            Add Product
                        </Link>
                    </li>
                
                    <li className="menu-item d-flex py-3">
                        <Link to="/admin/lists-product" className={pathname=="/admin/lists-product" && classes.active}>
                            <i className="fa-solid fa-list mr-2"></i>
                            Product Lists
                        </Link>
                    </li>
                    
                </ul>
                </li>
                <hr/>
                <li className="menu-item d-flex">
                    <Link to="/admin/order-lists" className={pathname==="/admin/order-lists" && classes.active}>
                        <i class="fa-solid fa-bag-shopping mr-2"></i>
                        Orders
                    </Link>
                </li>
            </ul>
        </div>
    </div>   
  )
}

export default Sidebar