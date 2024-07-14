const mongoose = require("mongoose");
const { Schema } = mongoose;

const seatSchema = new Schema({
    cinemaRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'cinemaRoom', required: true },
    seatRow: { type: Number, required: true },
    seatColumn: { type: String, required: true },
    seatStatus: { type: Number, required: true },
    seatType: { type: Number, required: true } // tùy theo number để set ghế vip, thường, cặp đôi
}, { timestamps: true });

const Seat = mongoose.model('seat', seatSchema);

module.exports = Seat;
