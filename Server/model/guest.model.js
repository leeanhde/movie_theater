const mongoose = require('mongoose');
const { Schema } = mongoose;

const guestSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is require"],
    },
    dob: {
        type: Date,
        require: [
            true,
            "dob is require"
        ]
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    ticket:{
        type: Schema.Types.ObjectId,
        ref:"ticket"
    }
}, {
    timestamps: true
})

const Guest = mongoose.model('guest', guestSchema);
module.exports = Guest;