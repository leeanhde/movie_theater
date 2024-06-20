const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
    Ticket: [{
        type: Schema.Types.ObjectId,
        ref: "ticket"
    }]
}, {
    timestamps: true
})

const History = mongoose.model('history', historySchema);
module.exports = History;