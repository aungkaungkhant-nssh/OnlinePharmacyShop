const express = require('express');
const router = express.Router();
const userAuthController = require('../../controllers/user/userAuthController');
const {check} = require('express-validator');

router.post('/register',
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
                .notEmpty()
                .withMessage("Password is requried")
                .isLength({min:5,max:50})
                .withMessage("Password must be min 5 and max 50"),
            check("confirmPassword")
                .custom((value,{req})=>{
                    if(value !== req.body.password){
                        throw new Error("Password confirmation does not match password")
                    }
                    return true;
                })
           
,userAuthController.postRegister);
router.post('/login',[
    check('email',"Email field is requried")
        .notEmpty()
        .withMessage("Email field is requried"),
    check('password',"Password is requried")
            .isString()
            .notEmpty()
            .isLength({min:4,max:20})
            .withMessage("Password has min 4 and max 20")
],userAuthController.postLogin);

router.get('/reset-password/:token',userAuthController.getUserDataFromToken);
router.post('/reset-password',[
    check('email')
    .notEmpty()
    .withMessage("Email field is requried"),
],userAuthController.postResetPassword);
router.put('/new-password',[
    check('password')
        .not()
        .isEmpty()
        .withMessage("Password is requried")
        .isLength({min:5,max:50})
        .withMessage("Password must be min 5 and max 50"),
    check("confirmPassword")
        .custom((value,{req})=>{
            if(value !== req.body.password){
                throw new Error("Password confirmation does not match password")
            }
            return true;
    })

],userAuthController.resetNewPassword);
module.exports = router;