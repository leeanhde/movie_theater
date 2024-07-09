const mongoose = require("mongoose");
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
    cinemaRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'cinemaRoom', required: true },
    scheduleTime: { type: Date, required: true },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Schedule = mongoose.model('schedule', scheduleSchema);

module.exports = Schedule;
