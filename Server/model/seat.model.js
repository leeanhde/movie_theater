const mongoose = require('mongoose');
const { Schema } = mongoose;

const seatSchema = new Schema({
    
}, {
    timestamps: true
})

const Seat = mongoose.model('seat', seatSchema);
module.exports = Seat;