const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
    movieNameEnglish: { type: String, required: true },
    movieNameVn: { type: String, required: true },
    director: String,
    actor: String,
    duration: { type: Number, required: true },
    fromDate: Date,
    toDate: Date,
    content: String,
    largeImage: String,
    smallImage: String,
    movieProductionCompany: String,
    time: Array,
    cinemaRoomId: [{type: mongoose.Schema.Types.ObjectId, ref:'cinemaroom', required: false}],
    promotionId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'promotion', required: false }],
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'type', required: false }],
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
