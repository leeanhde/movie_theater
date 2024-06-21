const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
    name: String,
    description: String,
    image: String
});

const Food = mongoose.model('food', foodSchema);
module.exports = Food;
