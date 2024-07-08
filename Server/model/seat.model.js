const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    cinemaRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'CinemaRoom', required: true },
    seatRow: { type: Number, required: true },
    seatColumn: { type: String, required: true },
    seatStatus: { type: Number, required: true }, // các trạng thái đã đặt, chưa đặt, bảo trì
    seatType: { type: Number, required: true } // tùy theo number để set ghế vip, thường, cặp đôi
}, { timestamps: true });

module.exports = mongoose.model('Seat', seatSchema);