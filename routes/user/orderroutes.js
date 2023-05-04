const express = require('express');
const router = express.Router();

const orderController = require('../../controllers/user/orderController');

const authUser = require('../../middleware/is-auth-user').isAuthUser;

router.get('/',authUser,orderController.getOrders);
router.post('/',authUser,orderController.postOrder);
router.get('/:id',authUser,orderController.getOrder);
router.put('/:id',authUser,orderController.paymentOrderUpdate);

module.exports =router;