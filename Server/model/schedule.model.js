const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    movies: [{
        
    }]
}, {
    timestamps: true
})

const Schedule = mongoose.model('schedule', scheduleSchema);
module.exports = Schedule;