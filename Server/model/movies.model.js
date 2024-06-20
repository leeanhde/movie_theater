const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genres: [{
        type: Schema.Types.ObjectId,
        ref:"genre"
    }],
    director: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 0,
        max: 300
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    detail: {
        type: String,
        required: true
    },
    language: {
        type: [String],
        required: true
    },
    country: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    boxOffice: {
        type: Number,
        required: true
    },
    reviews: [{
        reviewer: String,
        comment: String,
        rating: {
            type: Number,
            min: 0,
            max: 10
        }
    }],
    awards: [String],
    budget: {
        type: Number,
        required: true
    }
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
