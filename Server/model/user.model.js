const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
        max: 10
    },
    email: String,
    address: String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref:"role"
    }]

}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema);
module.exports = User;