const express = require('express');
const router = express.Router();
const { createPaymentUrl, paymentReturn } = require('../controller/vnpay.controller');

router.post('/create_payment_url', createPaymentUrl);
router.get('/payment_return', paymentReturn);

module.exports = router;
