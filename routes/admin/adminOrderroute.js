const express = require('express');
const router = express.Router();
const adminOrderController  = require('../../controllers/admin/adminOrderController');
const { isAuthAdmin } = require('../../middleware/is-auth-admin');
const orderController = require('../../controllers/user/orderController');


router.get('/',isAuthAdmin,adminOrderController.getOrders);
router.put('/:id',isAuthAdmin,adminOrderController.putDelivered);
router.get('/:id',isAuthAdmin,orderController.getOrder);
router.delete('/:id',isAuthAdmin,adminOrderController.deleteOrder);
module.exports = router;