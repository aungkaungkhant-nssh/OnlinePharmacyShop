import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/auth/authSlice";
import  addToCartSlice  from "../redux/products/addToCartSlice";
import createOrderSlice from "../redux/orders/createOrderSlice";
import productSlice from "../redux/products/productSlice";
import productsSlice from "../redux/products/productsSlice";
import shippingSlice from "../redux/products/shippingSlice";
import historyOrderSlice from "../redux/orders/historyOrderSlice";
import adminSlice from "../redux/admin/adminSlice";
import adminAuthSlice from "../redux/admin/authSlice"
import userSlice from "../redux/admin/userSlice";
import adminPannelProductSlice from '../redux/admin/productsSlice';
import categorySlice from "../redux/admin/categorySlice";
import orderSlice from '../redux/admin/orderSlice';
import lowerProductsSlice from "../redux/admin/lowerProductsSlice";
import dashboardSlice from '../redux/admin/dashboardSlice';
export const store = configureStore({
    reducer:{
        products:productsSlice,
        product:productSlice,
        auth:authSlice,
        addToCart:addToCartSlice,
        shipping:shippingSlice,
        orderCreate:createOrderSlice,
        historyOrder:historyOrderSlice,
        admin:adminSlice,
        adminAuth:adminAuthSlice,
        user:userSlice,
        adminPannelProduct :adminPannelProductSlice,
        category:categorySlice,
        orders:orderSlice,
        lowerProducts:lowerProductsSlice,
        dashboard:dashboardSlice
    }
})