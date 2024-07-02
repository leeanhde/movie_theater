const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    typeName: { type: String, required: true },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Type', typeSchema);