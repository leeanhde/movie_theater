//CinemaRoom Schema
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatRow: { type: Number, required: true },
    seatColumn: { type: String, required: true },
    seatStatus: { type: Number, required: true },// cac trang thai da dat, chua dat, bao tri
    seatType: { type: Number, required: true }, // tuy theo number de set ghe vip, thuong, cap doi
}, { _id: true });

const cinemaRoomSchema = new mongoose.Schema({
    cinemaRoomName: { type: String, required: true },
    seatQuantity: { type: Number, required: true },
    seats: [seatSchema],
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('CinemaRoom', cinemaRoomSchema);