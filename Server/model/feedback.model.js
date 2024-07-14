const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
    rating: { type: Number, required: true },
    comment: String,
}, { timestamps: true });

const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;
