const express = require('express');
const router  = express.Router();
const adminProductcontroller = require('../controllers/admin/adminProductcontroller');
const adminAuthController = require('../controllers/admin/adminAuthController');
const adminAdminUserController = require('../controllers/admin/adminAdminUserController');
const adminCategoryController = require('../controllers/admin/adminCategoryController');
const adminUserController = require('../controllers/admin/adminUserController');
const {check} = require('express-validator');
const isAuthAdmin = require('../middleware/is-auth-admin').isAuthAdmin;


//admin auth route
router.get('/login',adminAuthController.getAdminLogin);
router.post('/login',adminAuthController.postAdminLogin);
router.post('/reset-password',adminAuthController.postResetPassword);
router.get('/new-password/:token',adminAuthController.getNewPassword);
router.post('/new-password',adminAuthController.postNewPassword);

/// admin route middleware
router.use(isAuthAdmin);

// session to global varaible
router.use((req,res,next)=>{
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.admin = req.session.admin;
    next();
})
///admin user logout
router.post('/logout',adminAuthController.postAdminLogout);

router.get('/dashboard',isAuthAdmin,adminProductcontroller.getDashboard);

//admin user crud products
router.get('/product-lists',adminProductcontroller.getProducts);
router.get('/add-product',adminProductcontroller.getAddProduct);
router.post('/add-product',
[
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name field is required")
        .isString()
        .withMessage('must be at least 3 chars')
        .isLength({min:3})
        .trim(),
    check("price")
        .isNumeric()
        .withMessage('Price field is required')
        .trim(),
    check("description")
        .isLength({min:5,max:500})
        .withMessage("minimum 5 and maximum 500")
        .trim(),
    check("category_id")
        .notEmpty()
        .withMessage("Category field is required"),
    check("numberInstock")
        .notEmpty()
        .withMessage("Number Intock is required")
        .isNumeric()
    
],adminProductcontroller.postAddProduct);

router.post('/product-delete',adminProductcontroller.postDeleteProduct);
router.get('/edit-product/:id',adminProductcontroller.getEditProduct);
router.post('/edit-product',[
        check("name")
            .not()
            .isEmpty()
            .withMessage("Name field is required")
            .isString()
            .withMessage('must be at least 3 chars')
            .isLength({min:3})
            .trim(),
        check("price")
            .isNumeric()
            .withMessage('Price field is required')
            .trim(),
        check("description")
            .isLength({min:5,max:500})
            .withMessage("minimum 5 and maximum 500")
            .trim()
],adminProductcontroller.postUpdateProduct);

///admin user create,delete,read,update role,change profile picture,update user data;

router.get('/admin-lists',adminAdminUserController.getAdminUsers);
router.get('/add-admin',adminAdminUserController.getAddAdminUser);
router.post('/add-admin',
    [
        check("name")
            .notEmpty()
            .withMessage("Name field is required"),
        check('email')
            .notEmpty()
            .withMessage("Email field is requried")
            .isEmail()
            .withMessage("Valid Email"),
        check('phone')
            .notEmpty()
            .withMessage("Phone field is requried")
            .isNumeric()
            .withMessage("Fill Number Value"),
        check('password')
            .isString()
            .notEmpty()
            .withMessage("Password is requried")
            .isLength({min:5,max:50})
            .withMessage("Password must be min 5 and max 50"),
       
    ]
,adminAdminUserController.postAddAdminUser);
router.post('/admin-delete',adminAdminUserController.postDeleteAdmin);
router.post('/update-role',adminAdminUserController.postUpdateAdminRole);
router.get('/profile',adminAdminUserController.getAdminProfile);
router.post('/adminuser-update',adminAdminUserController.postAdminUserUpdate);
router.post('/change-profile',adminAdminUserController.getChangeProfile);


//add category
router.get('/category-lists',adminCategoryController.getCategories);
router.get('/add-category',adminCategoryController.getAddCategory);
router.post('/add-category',adminCategoryController.postAddCategory);
router.post('/category-delete',adminCategoryController.postDeleteCategory);
router.get('/edit-category/:id',adminCategoryController.getEditCategory);
router.post('/edit-category',adminCategoryController.postEditCategory);


//user
router.get('/user-lists',adminUserController.getUsers);
router.post('/user-delete',adminUserController.postDeleteUser);
module.exports = router;