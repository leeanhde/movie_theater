const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    cinemaRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'CinemaRoom', required: true },
    scheduleTime: { type: Date, required: true },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);