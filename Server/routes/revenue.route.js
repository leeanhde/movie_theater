const express = require('express');
const router = express.Router();
const booking = require('../controller/booking.controller');

router.get('/listTransaction', booking.getRevenue);
router.get('/revenue', booking.getRevenueByPeriod);


module.exports = router;
