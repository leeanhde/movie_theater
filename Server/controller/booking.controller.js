const mongoose = require('mongoose');
const User = require('../model/user.model'); 
const Schedule = require('../model/schedule.model'); 
const db = require('../model/index');
const Booking = db.booking;

async function bookTicket(req, res, next) {
    try {
        const { userId, scheduleId, seats, snacks, totalAmount, paymentMethod } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const schedule = await Schedule.findById(scheduleId);

        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        const newBooking = {
            _id: new mongoose.Types.ObjectId(),
            scheduleId,
            seats,
            snacks,
            totalAmount,
            paymentMethod,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        user.bookings.push(newBooking);
        await user.save();

        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
}

async function getBookingHistory(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate({
            path: 'bookings.scheduleId',
            populate: { path: 'movieId cinemaRoomId' }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.bookings);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    bookTicket,
    getBookingHistory
};
