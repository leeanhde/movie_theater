const mongoose = require("mongoose");
const { Schema } = mongoose;

const cinemaRoomSchema = new Schema({
    cinemaRoomName: { type: String, required: true },
    seatQuantity: { type: Number, required: true },
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'seat' }],
    movieId: [{type: mongoose.Schema.Types.ObjectId, ref: 'movie'}],
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const CinemaRoom = mongoose.model('cinemaRoom', cinemaRoomSchema);

module.exports = CinemaRoom;