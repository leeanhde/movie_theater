const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: String
}, {
    timestamps: true
})

const Role = mongoose.model('guest', roleSchema);
module.exports = Role;