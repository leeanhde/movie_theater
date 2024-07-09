const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule', required: true },
    seats: [{ type: String, required: true }],
    snacks: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true }
}, { timestamps: true });

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
