const mongoose = require("mongoose");
const { Schema } = mongoose;

const typeSchema = new Schema({
    typeName: { type: String, required: true },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Type = mongoose.model('type', typeSchema);

module.exports = Type;
