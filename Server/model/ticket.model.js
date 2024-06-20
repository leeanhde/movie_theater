const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
    movieTitle: {
        type: String,
        required: true
    },
    showTime: {
        type: Date,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    theater: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Ticket = mongoose.model('ticket', ticketSchema);
module.exports = Ticket;
