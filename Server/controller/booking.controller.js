const { User, Booking } = require("../model/index");

const createBooking = async (req, res, next) => {
  try {
    const { scheduleId, seats, snacks, totalAmount, paymentMethod } = req.body;
    const userId = req.user.id;

    if (!scheduleId || !seats || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: "Required data missing", data: null });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const booking = new Booking({
      userId,
      scheduleId,
      seats,
      snacks,
      totalAmount,
      paymentMethod
    });

    user.bookings.push(booking);

    await booking.save();
    await user.save();

    res.status(201).json({ message: "Booking created successfully", data: booking });
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('userId').populate('scheduleId');
    res.status(200).json({ bookings });
  } catch (error) {
    next(error);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('bookings');

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    res.status(200).json({ bookings: user.bookings });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const { seats, snacks, totalAmount, paymentMethod } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found", data: null });
    }

    booking.seats = seats ?? booking.seats;
    booking.snacks = snacks ?? booking.snacks;
    booking.totalAmount = totalAmount ?? booking.totalAmount;
    booking.paymentMethod = paymentMethod ?? booking.paymentMethod;

    await booking.save();

    res.status(200).json({ message: "Booking updated successfully", data: booking });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found", data: null });
    }

    await booking.remove();

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getAllBookings, getUserBookings, updateBooking, deleteBooking };
