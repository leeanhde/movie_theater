const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    detail: String,
    discountLevel: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    image: String,
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);