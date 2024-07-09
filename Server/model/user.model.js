const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    fullName: String,
    gender: String,
    identityCard: String,
    image: String,
    phoneNumber: String,
    address: String,
    dob: Date,
    registerDate: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "role"
    }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'booking' }],
    feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'feedback' }]
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;
