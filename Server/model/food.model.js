const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodTitle: {type: String, required: true},
    foodDescription: {type: String, required: true},
    foodPrice: {type: Number, required: true},
    foodQuantity: {type: Number, required: true},
    foodImage: {type: String, required: true},
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;