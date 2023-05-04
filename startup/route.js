const prouductRoutes = require('../routes/user/productroutes');
// const adminRoutes = require('./routes/adminroutes');
const authRoutes = require('../routes/user/authroutes');
const orderRoutes = require('../routes/user/orderroutes');
const userUpdateRoutes = require('../routes/user/userUpdateroutes');
const adminUserRoutes = require('../routes/admin/adminUserroutes');
const adminAuthRoutes = require('../routes/admin/authroutes');
const adminCustomerRoutes = require('../routes/admin/userroute');
const adminProductRoutes = require('../routes/admin/productroute');
const adminCategoryRoutes = require('../routes/admin/categoryroute');
const adminOrderRoutes  = require('../routes/admin/adminOrderroute');
const adminDashboardRoutes = require('../routes/admin/adminDashboardroute');

const adminUpdateRoutes = require('../routes/admin/adminUpdateroute');

module.exports = (app)=>{
        ///user api
    app.use('/api/auth',authRoutes);
    app.use("/api/update",userUpdateRoutes);
    app.use('/api/products',prouductRoutes);
    app.use('/api/order',orderRoutes)

    //admin routes

    app.use('/api/admin/auth',adminAuthRoutes);
    app.use('/api/admin/dashboard',adminDashboardRoutes);
    app.use('/api/admin/admin-users',adminUserRoutes);
    app.use('/api/admin/users',adminCustomerRoutes);
    app.use('/api/admin/products',adminProductRoutes);
    app.use('/api/admin/categories',adminCategoryRoutes);
    app.use('/api/admin/update',adminUpdateRoutes);
    app.use('/api/admin/orders',adminOrderRoutes)
}