const mongoose = require('mongoose');
const { Schema } = mongoose;

const genreSchema = new Schema({
    name: String,
    description: String
});

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
