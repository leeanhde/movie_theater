const express = require('express');
const router = express.Router();
const movieRouter = require('./movie.route');
const TypeRouter = require('./type.route');
const PromotionRouter = require('./promotion.route');
const CinemaRouter = require('./cinemaRoom.route')
const AuthRouter = require("./auth.route");
const FeedbackRouter = require('./feedback.route');
const UserRouter = require("./user.route");
const BookingRouter = require("./booking.route");
const ScheduleRouter = require('./schedule.route')

router.use('/movies', movieRouter);
router.use('/types', TypeRouter);
router.use('/promotions', PromotionRouter);
router.use('/auth', AuthRouter);
router.use('/cinemas', CinemaRouter);
router.use('/feedbacks', FeedbackRouter);
router.use('/user', UserRouter);
router.use('/booking', BookingRouter);
router.use('/schedule', ScheduleRouter)

module.exports = router;