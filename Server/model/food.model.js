const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodId: {type: Number, required: true},
    foodTitle: {type: String, required: true},
    foodDescription: {type: String, required: true},
    foodPrice: {type: Number, required: true},
    foodQuantity: {type: Number, required: true},
    foodImage: {type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);