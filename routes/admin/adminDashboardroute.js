const express = require('express');
const router = express.Router();
const adminDashboardController = require('../../controllers/admin/adminDashboardContolller');
const { isAuthAdmin } = require('../../middleware/is-auth-admin');
router.get('/',isAuthAdmin,adminDashboardController.getDashboardData);

module.exports = router;
