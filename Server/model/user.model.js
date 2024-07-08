const mongoose = require('mongoose');

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
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);