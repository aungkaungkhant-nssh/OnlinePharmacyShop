const express = require('express');
const router = express.Router();
const adminUpdateController = require('../../controllers/admin/adminUpdateController');
const { isAuthAdmin } = require('../../middleware/is-auth-admin');
const {check} = require('express-validator');
router.put('/profile',isAuthAdmin,[
        check("name")
            .notEmpty()
            .withMessage("Name field is required")
            .isString()
            .withMessage('must be at least 3 chars')
            .isLength({min:3})
            .trim(),
        check('email')
            .notEmpty()
            .withMessage("Email field is requried"),
        check('phone')
            .notEmpty()
            .withMessage("Phone field is requried")
],adminUpdateController.updateProfile);
router.put('/password',isAuthAdmin,[
        check('oldPassword',"Old Password is requried")
            .isString()
            .notEmpty(),
        check('newPassword')
            .isString()
            .not()
            .isEmpty()
            .withMessage("Password is requried")
            .isLength({min:5,max:50})
            .withMessage("Password must be min 5 and max 50"),
        check("confirmPassword")
            .custom((value,{req})=>{
                if(value !== req.body.newPassword){
                    throw new Error("Password confirmation does not match new password")
                }
                return true;
        })
],adminUpdateController.updatePassword);
module.exports = router;