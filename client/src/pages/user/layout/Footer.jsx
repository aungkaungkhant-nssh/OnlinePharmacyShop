import React from 'react'
import classes from './Master.module.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';

function Footer() {
    const {pathname} = useLocation();
  return (
    <div className={`row ${classes.footer}`}>
        <footer className="bg-light col-12">
            <div className="container">
                <div className="row" style={{borderBottom:"1px solid #ccc",paddingBottom:"1rem"}}>
                    <div className="col-12 col-md-6 col-lg-3 mt-3 text-center text-md-left">
                        <div className="footer-social">
                            <p className="text-black-50">Medicine Shop</p>
                            <h4 className="mb-4">MyatThueKha</h4>
                            <div>
                                <a href="" className="mr-4"><i className="fa-brands fa-facebook"></i></a>
                                <a href="" className="mr-4"><i className="fa-brands fa-instagram"></i></a>
                                <a href="" className="mr-4"><i className="fa-brands fa-twitter"></i></a>
                                <a href="" className="mr-4"><i className="fa-brands fa-google-plus-g"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mt-3 text-center text-md-left">
                        <div>
                            <h4 className="mb-3 ">Quick Links</h4>
                            <ul className='pl-2 pl-md-0'>
                                <li className="mb-0"><Link to='/' className={`nav-link ${pathname==="/" ? 'text-primary': 'text-black-50'} pb-0`}>Home</Link></li>
                                <li className="mb-0"><Link to='/shop' className={`nav-link ${pathname==="/shop" ? 'text-primary': 'text-black-50'} pb-0`}>Shop</Link></li>
                                <li className="mb-0"><Link to='/order' className={`nav-link ${pathname==="/order" ? 'text-primary': 'text-black-50'} pb-0`}>Order</Link></li>
                                <li className="mb-0"><Link to='/cart' className={`nav-link ${pathname==="/cart" ? 'text-primary': 'text-black-50'} pb-0`}>Cart</Link></li>
                                <li className="mb-0"><Link to='/admin/login' className={`nav-link ${pathname==="/admin/login" ? 'text-primary': 'text-black-50' } pb-0`}>Admin</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                            <h4 className="mb-3 text-center text-md-left">Hours</h4>
                            <table className="text-black-50 ml-auto mr-auto ml-md-0 mr-md-0">
                                <tr>
                                    <td style={{width:"100px"}}>Monday</td>
                                    <td>8AM To 7PM</td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>8AM To 7PM</td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td>8AM To 7PM</td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td>8AM To 7PM</td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td>8AM To 7PM</td>
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td>8AM To 7PM</td>
                                </tr>
                                <tr>
                                    <td>Sunday</td>
                                    <td>8AM To 7PM</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                            <h4 className="mb-3 text-md-left text-center">Contact</h4>
                            <table className='ml-auto mr-auto  ml-md-0 mr-md-0'>
                                <tr>
                                    <td style={{width:"30px"}}>
                                        <i className="fa-solid fa-phone"></i>
                                    </td>
                                    <td className="text-black-50">
                                        09453843347
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <i className="fa-solid fa-envelope"></i>
                                    </td>
                                    <td className="text-black-50">
                                        myattuhukha123@gmial.com
                                    </td>
                                </tr>
                                <tr>
                                    <td><i className="fa-solid fa-location-dot"></i></td>
                                    <td className="text-black-50">
                                        Monywa
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 py-3">
                        <p className="text-black-50 mb-0">Copy right © 2022 MyatThueKha By Ei Ei | All right reserved</p>
                    </div>
                </div>
            </div>
    
        </footer> 
    </div>
  )
}

export default Footer