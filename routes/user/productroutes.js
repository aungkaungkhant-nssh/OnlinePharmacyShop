const express = require('express');
const router = express.Router();
const homecontroller = require('../../controllers/user/homecontroller');


router.get('/',homecontroller.getProducts);
router.get('/:id',homecontroller.getProduct);
router.put('/:id/reviews',homecontroller.postReviews);

module.exports =router;