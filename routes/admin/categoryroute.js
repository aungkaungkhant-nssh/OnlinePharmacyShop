const express = require('express');
const router = express.Router();
const adminCategoryController = require('../../controllers/admin/adminCategoryController');
const {check} = require('express-validator');
const { isAuthAdmin } = require('../../middleware/is-auth-admin');

router.post('/',
            check("name")
                .notEmpty()
                .withMessage("Name field is required")
,isAuthAdmin,adminCategoryController.postAddCategory);

router.get('/',isAuthAdmin,adminCategoryController.getCategories);
router.delete('/:id',isAuthAdmin,adminCategoryController.deleteCategory)

module.exports = router;