const mongoose = require('mongoose');

const cinemaRoomSchema = new mongoose.Schema({
    cinemaRoomName: { type: String, required: true },
    seatQuantity: { type: Number, required: true },
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('CinemaRoom', cinemaRoomSchema);