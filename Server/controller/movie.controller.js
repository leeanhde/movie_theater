const db = require("../model/index");
const Movie = db.Movie;

async function createMovie(req, res, next) {
    try {
        const newMovie = new Movie({
            movieNameEnglish: req.body.movieNameEnglish,
            movieNameVn: req.body.movieNameVn,
            director: req.body.director,
            actor: req.body.actor,
            duration: req.body.duration,
            fromDate: req.body.fromDate,
            toDate: req.body.toDate,
            content: req.body.content,
            largeImage: req.body.largeImage,
            smallImage: req.body.smallImage,
            movieProductionCompany: req.body.movieProductionCompany,
            promotionId: req.body.promotionId,
            types: req.body.types,
        });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        next(error);
    }
}

async function edit(req, res, next) {
    try {
        const MovieId = req.params.id;
        const updatedData = {
            $set: {
                movieNameEnglish: req.body.movieNameEnglish,
                movieNameVn: req.body.movieNameVn,
                director: req.body.director,
                actor: req.body.actor,
                duration: req.body.duration,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                content: req.body.content,
                largeImage: req.body.largeImage,
                smallImage: req.body.smallImage,
                movieProductionCompany: req.body.movieProductionCompany,
            },
            $addToSet: {
                promotionId: req.body.promotionId,
                types: req.body.types,
            },
            $set: {
                deleted: req.body.deleted,
            },
        };
        const updatedMovie = await Movie.findByIdAndUpdate(MovieId, updatedData, { new: true });
        res.status(200).json(updatedMovie);
    } catch (error) {
        next(error);
    }
}

async function list(req, res, next) {
    try {
        const listMovies = await Movie.find().populate("promotionId types");
        const newListMovies = listMovies.map(m => ({
            _id: m._id,
            movieNameEnglish: m.movieNameEnglish,
            movieNameVn: m.movieNameVn,
            director: m.director,
            actor: m.actor,
            duration: m.duration,
            fromDate: m.fromDate,
            toDate: m.toDate,
            content: m.content,
            largeImage: m.largeImage,
            smallImage: m.smallImage,
            movieProductionCompany: m.movieProductionCompany,
            promotionId: m.promotionId?.map(p => p.title),
            types: m.types?.map(t => t.typeName),
            deleted: m.deleted
        }));
        res.status(200).json(newListMovies);
    } catch (error) {
        next(error);
    }
}

async function deleteMovie(req, res, next) {
    try {
        const MovieId = req.params.id;
        await Movie.findByIdAndDelete(MovieId);
        res.status(204).json({ message: "Movie deleted successfully" });
    } catch (error) {
        next(error);
    }
}

const MovieController = {
    createMovie,
    edit,
    list,
    deleteMovie
}

module.exports = MovieController;
