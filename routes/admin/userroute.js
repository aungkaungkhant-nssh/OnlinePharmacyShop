const express = require('express');
const router = express.Router();
const adminUserController = require('../../controllers/admin/adminUserController');
const {check} = require('express-validator');
const { isAuthAdmin } = require('../../middleware/is-auth-admin');



router.get('/',isAuthAdmin,adminUserController.getUsers);
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
           
            .notEmpty()
            .withMessage("Password is requried")
            .isLength({min:5,max:50})
            .withMessage("Password must be min 5 and max 50"),
],isAuthAdmin,adminUserController.postAddUser);
router.delete('/:id',isAuthAdmin,adminUserController.deleteUser);

module.exports = router;