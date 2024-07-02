const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieNameEnglish: { type: String, required: true },
    movieNameVn: { type: String, required: true },
    director: String,
    actor: String,
    duration: { type: Number, required: true },
    fromDate: Date,
    toDate: Date,
    content: String,
    largeImage: String,
    smallImage: String,
    movieProductionCompany: String,
    promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);