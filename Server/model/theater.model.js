const mongoose = require('mongoose');
const { Schema } = mongoose;

const TheaterSchema = new Schema({
    name: String,
    description: String,
    room: [{
        type: Schema.Types.ObjectId,
        ref:'seat'
    }]
});

const Theater = mongoose.model('theater', TheaterSchema);
module.exports = Theater;
