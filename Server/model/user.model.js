//user schema
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
    seats: [{ type: String, required: true }],
    snacks: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { _id: true });

const feedbackSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { _id: true });

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    fullName: String,
    gender: String,
    identityCard: String,
    image: String,
    phoneNumber: String,
    address: String,
    dateOfBirth: Date,
    registerDate: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    role: { type: String, enum: ['User', 'Guest', 'Staff', 'Supervisor', 'Admin'], required: true },
    bookings: [bookingSchema],
    feedbacks: [feedbackSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);