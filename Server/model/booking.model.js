const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
    date: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule' },
    movieId: {type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
    seats: [{ type: String}],
    cinemaroom: {type: mongoose.Schema.Types.ObjectId, ref: 'cinemaRoom', },
    foodId: [{type: mongoose.Schema.Types.ObjectId, ref: 'food' }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    isPaid: { type: Boolean, required: true},
}, { timestamps: true });

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
