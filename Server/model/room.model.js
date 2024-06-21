const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    name: String,
    description: String,
    seat: [{
        type: Schema.Types.ObjectId,
        ref:'seat'
    }]
});

const Room = mongoose.model('room', roomSchema);
module.exports = Room;
