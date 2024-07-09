const mongoose = require("mongoose");
const { Schema } = mongoose;

const promotionSchema = new Schema({
    title: { type: String, required: true },
    detail: String,
    discountLevel: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    image: String,
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Promotion = mongoose.model('promotion', promotionSchema);

module.exports = Promotion;
