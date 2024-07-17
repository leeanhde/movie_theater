const mongoose = require('mongoose');
const User = require('../model/user.model'); 
const Schedule = require('../model/schedule.model'); 
const db = require('../model/index');
const Booking = db.booking;

async function bookTicket(req, res, next) {
    try {
        const { userId , movieId, seats,date, foodId, totalAmount } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // const schedule = await Schedule.findById(scheduleId);
        // if (!schedule) {
        //     return res.status(404).json({ message: "Schedule not found" });
        // }

        const newBooking = new Booking({
            date: date,
            userId,
            movieId,
            seats,
            foodId,
            totalAmount,
            paymentMethod: "VNpay",
            isPaid: false
        });

        await newBooking.save();

        user.bookings.push(newBooking._id);
        await user.save();

        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
}
async function updateBooking(bookingId, updateData) {
    try {


        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return{ message: "Booking not found" }
        }

        Object.keys(updateData).forEach(key => {
            booking[key] = updateData[key];
        });

        await booking.save();
        return booking
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
    getBookingHistory,
    updateBooking
};
