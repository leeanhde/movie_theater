const express = require('express');
const router = express.Router();
const bookingController = require('../controller/booking.controller'); // Assuming booking controller is in controllers directory

router.post('/book-ticket', bookingController.bookTicket);

module.exports = router;
