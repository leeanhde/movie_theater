const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    time: {type: Date, required: true},
    totalPrice: {type: Number, required: true},
    roomId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cinemarooms' }],
    scheduleId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedules' }],
    seatIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'seats' }],
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);