const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { _id: true });

const Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;

