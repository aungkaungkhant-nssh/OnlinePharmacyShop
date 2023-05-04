const express = require('express');
const router = express.Router();
const adminAuthController =  require('../../controllers/admin/adminAuthController');
const {check} = require('express-validator');
router.post('/login',[
    check('email')
        .notEmpty()
        .withMessage("Email field is requried"),
    check('password',"Password is requried")
        .isString()
        .notEmpty()
        .isLength({min:4,max:20})
        .withMessage("Password has min 4 and max 20")
],adminAuthController.postAdminLogin);

module.exports = router;