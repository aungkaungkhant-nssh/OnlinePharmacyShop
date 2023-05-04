import React from 'react'
import { Routes,Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Cart from './pages/user/Cart'

import Home from './pages/user/Home'
import Login from './pages/user/Login'
import NotFound from './pages/user/NotFound'
import Order from './pages/user/Order'
import OrderHistory from './pages/user/OrderHistory'
import Payment from './pages/user/Payment'
import PlaceOrder from './pages/user/PlaceOrder'
import ProductDetail from './pages/user/ProductDetail'
import Products from './pages/user/Products'
import Profile from './pages/user/Profile'
import Register from './pages/user/Register'
import Shipping from './pages/user/Shipping'
import AdminLogin from './pages/admin/auth/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminLists from './pages/admin/admin-users/AdminLists'
import AdminRoute from './components/AdminRoute'
import AddAdminForm from './pages/admin/admin-users/AddAdminForm'
import UserLists from './pages/admin/customers/UserLists'
import AddUserForm from './pages/admin/customers/AddUserForm'
import ProductLists from './pages/admin/products/ProductLists'
import AddProductForm from './pages/admin/products/AddProductForm'
import AddCategoryForm from './pages/admin/categories/AddCategoryForm'
import CategoryLists from './pages/admin/categories/CategoryLists'
import AdminProfile from './pages/admin/Profile'
import OrderLists from './pages/admin/orders/OrderLists'
import ForgotPassword from './pages/user/ForgotPassword'
import NewPassword from './pages/user/NewPassword'
import LowerProductLists from './pages/admin/products/LowerProductLists'
function MainRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/shop/:id' element={<ProductDetail />} />
        <Route path='/shop' element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/cart/' element={<Cart />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/shipping' element={<PrivateRoute><Shipping /></PrivateRoute>} />
        <Route path='/payment' element={<PrivateRoute><Payment /></PrivateRoute>} />
        <Route path="/placeorder" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
        <Route path='/order/:id' element={<PrivateRoute><Order /></PrivateRoute>} />
        <Route path='/order' element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
        <Route path='/profile/account-settings' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
        <Route path='/reset/:token' element={<NewPassword />}></Route>
        {/* admin routes */}
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>}></Route>
        <Route path="/admin/lists-admin" element={<AdminRoute><AdminLists /></AdminRoute>}></Route>
        <Route path="/admin/add-admin" element={<AdminRoute><AddAdminForm /></AdminRoute>}></Route>
        <Route path="/admin/lists-user" element={<AdminRoute><UserLists /></AdminRoute>}></Route>
        <Route path="/admin/add-user" element={<AdminRoute><AddUserForm /></AdminRoute>}></Route>
        <Route path='/admin/lists-product' element={<AdminRoute><ProductLists /></AdminRoute>}></Route>
        <Route path='/admin/add-product' element={<AdminRoute><AddProductForm /></AdminRoute>}></Route>
        <Route path='/admin/edit-product' element={<AdminRoute><AddProductForm /></AdminRoute>}></Route>
        <Route path='/admin/add-category' element={<AdminRoute><AddCategoryForm /></AdminRoute>}></Route>
        <Route path='/admin/lists-category' element={<AdminRoute><CategoryLists /></AdminRoute>}></Route>
        <Route path='/admin/account-settings' element={<AdminRoute><AdminProfile /></AdminRoute>}></Route>
        <Route path='/admin/order-lists' element={<AdminRoute><OrderLists /></AdminRoute>}></Route>
        <Route path='/admin/order/:id' element={<AdminRoute><Order /></AdminRoute>}></Route>
        <Route path='/admin/lower-products' element={<AdminRoute><LowerProductLists /></AdminRoute>}></Route>
    </Routes> 
  )
}

export default MainRouter