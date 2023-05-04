const express = require('express');
const router =express.Router();
const adminAdminUserController = require('../../controllers/admin/adminAdminUserController');
const {check} = require('express-validator');
const { isAuthAdmin } = require('../../middleware/is-auth-admin');


router.get('/',isAuthAdmin,adminAdminUserController.getAdminUsers);
router.post('/',[
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
],isAuthAdmin,adminAdminUserController.postAddAdminUser);
router.delete('/:id',isAuthAdmin,adminAdminUserController.deleteAdmin)
router.put('/:id',isAuthAdmin,adminAdminUserController.updateAdminRole)

module.exports = router;