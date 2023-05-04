const express = require("express");
const router =express.Router();
const adminProductsController = require('../../controllers/admin/adminProductcontroller');
const {check} = require('express-validator');
const { isAuthAdmin } = require("../../middleware/is-auth-admin");

router.get('/',isAuthAdmin,adminProductsController.getProducts);
router.post('/',[
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name field is required")
        .isString()
        .isLength({min:3})
        .withMessage('must be at least 3 chars')
        .trim(),
    check("image")
        .not()
        .isEmpty()
        .withMessage("Image field is required")
        .isString()
    ,
    check("price")
        .isNumeric()
        .withMessage('Price field is required')
        .trim(),
    check("description")
        .isLength({min:5,max:500})
        .withMessage("minimum 5 and maximum 500")
        .trim(),
    check("categoryId")
        .notEmpty()
        .withMessage("Category field is required"),
    check("numberInstock")
        .notEmpty()
        .withMessage("Number Intock is required")
        .isNumeric()
    
],isAuthAdmin,adminProductsController.postAddProduct);
router.delete('/:id',isAuthAdmin,adminProductsController.deleteProduct);
router.put('/:id',[
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name field is required")
        .isString()
        .isLength({min:3})
        .withMessage('must be at least 3 chars')
        .trim(),
    check("price")
        .isNumeric()
        .withMessage('Price field is required')
        .trim(),
    check("description")
        .isLength({min:5,max:500})
        .withMessage("minimum 5 and maximum 500")
        .trim(),
    check("categoryId")
        .notEmpty()
        .withMessage("Category field is required"),
    check("numberInstock")
        .notEmpty()
        .withMessage("Number Intock is required")
        .isNumeric()
    
],isAuthAdmin,adminProductsController.updateProduct);
router.get('/lowerNumberInstock',isAuthAdmin,adminProductsController.getLowerNumberInstock)
module.exports = router;