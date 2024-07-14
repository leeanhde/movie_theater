const express = require('express');
const bodyParser = require('body-parser');
const BookingController = require('../controller/booking.controller'); 
const bookingRouter = express.Router();
bookingRouter.use(bodyParser.json());

bookingRouter.post('/bookticket', BookingController.bookTicket);
bookingRouter.get('/history/:id', BookingController.getBookingHistory);


module.exports = bookingRouter;
