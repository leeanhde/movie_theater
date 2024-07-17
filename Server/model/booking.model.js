const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
    date: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule', required: true },
    movieId: {type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
    seats: {type: mongoose.Schema.Types.ObjectId, ref: 'seat', required: true },
    cinemaroom: {type: mongoose.Schema.Types.ObjectId, ref: 'cinemaRoom', required: true },
    foodId: {type: mongoose.Schema.Types.ObjectId, ref: 'food' },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true }
}, { timestamps: true });

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
