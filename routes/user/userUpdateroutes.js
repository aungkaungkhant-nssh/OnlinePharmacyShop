const express = require('express');
const updateUpdateController = require('../../controllers/user/userUpdateController');
const router = express.Router();
const authUser = require('../../middleware/is-auth-user').isAuthUser;
const {check} = require('express-validator');

router.put("/profile",authUser,
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

,updateUpdateController.putUpdateProfile);

router.put('/password',authUser,
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
                }),
                updateUpdateController.putUpdatePassword
)

module.exports = router;