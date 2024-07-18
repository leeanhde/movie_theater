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
        const booking = await Booking.findById(bookingId).populate("users");

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
            path: 'bookings',
            match: { isPaid: true },
            populate: {
                path: 'scheduleId movieId cinemaroom foodId'
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.bookings);
    } catch (error) {
        next(error);
    }
}

async function getRevenue(req, res, next) {
    try {
        const paidBookings = await Booking.find({ isPaid: true }).populate('userId');
        
        const totalRevenue = paidBookings.reduce((sum, booking) => {
            return sum + booking.totalAmount;
        }, 0);

        res.status(200).json({ totalRevenue ,paidBookings});
    } catch (error) {
        next(error);
    }

}async function getRevenueByPeriod(req, res, next) {
    try {
        const now = new Date();
        
        // Calculate start dates for each period
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        // Fetch all paid bookings
        const paidBookings = await Booking.find({ isPaid: true });

        // Calculate revenue for each period
        const dailyRevenue = calculateRevenue(paidBookings, startOfDay);
        const weeklyRevenue = calculateRevenue(paidBookings, startOfWeek);
        const monthlyRevenue = calculateRevenue(paidBookings, startOfMonth);
        const yearlyRevenue = calculateRevenue(paidBookings, startOfYear);

        // Respond with the calculated revenues
        res.status(200).json({
            dailyRevenue,
            weeklyRevenue,
            monthlyRevenue,
            yearlyRevenue
        });
    } catch (error) {
        next(error);
    }
}
function calculateRevenue(bookings, startDate) {
    return bookings
        .filter(booking => booking.createdAt >= startDate)
        .reduce((sum, booking) => sum + booking.totalAmount, 0);
}
module.exports = {
    bookTicket,
    getBookingHistory,
    updateBooking,
    getRevenue,
    getRevenueByPeriod
};
