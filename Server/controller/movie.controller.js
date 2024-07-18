const db = require("../model/index");
// const Movie = require('../model/movie.model');
const Movie = db.movie;

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
            types: req.body.types,
        });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        next(error);
    }
}

async function editMovie(req, res, next) {
    try {
        const MovieId = req.params.id;
        const updatedData = {
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
            deleted: req.body.deleted,
            cinemaRoomId: req.body.cinemaRoomId
        };
        const updatedMovie = await Movie.findByIdAndUpdate(MovieId, updatedData, { new: true });
        res.status(200).json(updatedMovie);
    } catch (error) {
        next(error);
    }
}

async function listMovies(req, res, next) {
    try {
        const listMovies = await Movie.find().populate("promotionId types");
        const newListMovies = listMovies.map(m => ({
            _id: m._id,
            movieNameEnglish: m.movieNameEnglish,
            movieNameVn: m.movieNameVn,
            director: m.director,
            actor: m.actor,
            duration: m.duration,
            fromDate: new Date(m.fromDate).toDateString('en-GB'),
            toDate: new Date(m.toDate).toDateString('en-GB'),
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

async function getMovieById(req, res, next) {
    try {
        const MovieId = req.params.id;
        const movie = await Movie.findById(MovieId).populate("promotionId types");
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
}

async function deleteMovie(req, res, next) {
    try {
        const MovieId = req.params.id;
        await Movie.findByIdAndDelete(MovieId);
        res.status(200).json({ message: "Movie deleted successfully" , MovieId});
    } catch (error) {
        next(error);
    }
}

async function nowShowingMovies(req, res, next) {
    try {
        const currentDate = new Date();
        const movies = await Movie.find({
            fromDate: { $lte: currentDate },
            toDate: { $gte: currentDate }
        }).populate("promotionId types");
        const nowShowingList = movies.map(m => {
            const fromDate = new Date(m.fromDate);
            const toDate = new Date(m.toDate);
            const isNowShowing = fromDate <= currentDate && toDate >= currentDate;

            if (isNowShowing) {
                return {
                    _id: m._id,
                    movieNameEnglish: m.movieNameEnglish,
                    movieNameVn: m.movieNameVn,
                    director: m.director,
                    actor: m.actor,
                    duration: m.duration,
                    fromDate: fromDate.toDateString('en-GB'),
                    toDate: toDate.toDateString('en-GB'),
                    content: m.content,
                    largeImage: m.largeImage,
                    smallImage: m.smallImage,
                    movieProductionCompany: m.movieProductionCompany,
                    promotionId: m.promotionId?.map(p => p.title),
                    types: m.types?.map(t => t.typeName),
                    deleted: m.deleted
                };
            }
        }).filter(m => m !== undefined); // Filter out undefined values
        console.log(nowShowingList);
        res.status(200).json(nowShowingList);
    } catch (error) {
        next(error);
    }
};

async function comingSoonMovies(req, res, next) {
    try {
        const currentDate = new Date();
        const movies = await Movie.find({
            fromDate: { $gt: currentDate }
        }).populate("promotionId types");
        
        const comingSoonList = movies.map(m => ({
            _id: m._id,
            movieNameEnglish: m.movieNameEnglish,
            movieNameVn: m.movieNameVn,
            director: m.director,
            actor: m.actor,
            duration: m.duration,
            fromDate: new Date(m.fromDate).toDateString('en-GB'),
            toDate: new Date(m.toDate).toDateString('en-GB'),
            content: m.content,
            largeImage: m.largeImage,
            smallImage: m.smallImage,
            movieProductionCompany: m.movieProductionCompany,
            promotionId: m.promotionId?.map(p => p.title),
            types: m.types?.map(t => t.typeName),
            deleted: m.deleted
        }));

        res.status(200).json(comingSoonList);
    } catch (error) {
        next(error);
    }
}

async function getMovieDetail(req, res, next) {
    try {
        const movieId = req.params.id; 
        const movie = await Movie.findById(movieId).populate("promotionId types"); 
        
        
        const movieDetail = {
            _id: movie._id,
            movieNameEnglish: movie.movieNameEnglish,
            movieNameVn: movie.movieNameVn,
            director: movie.director,
            actor: movie.actor,
            duration: movie.duration,
            fromDate: new Date(movie.fromDate).toDateString('en-GB'),
            toDate: new Date(movie.toDate).toDateString('en-GB'),
            content: movie.content,
            largeImage: movie.largeImage,
            smallImage: movie.smallImage,
            movieProductionCompany: movie.movieProductionCompany,
            promotionId: movie.promotionId?.map(promotion => promotion.title),
            types: movie.types?.map(type => type.name),
            deleted: movie.deleted,
            createdAt: movie.createdAt,
            updatedAt: movie.updatedAt
        };

        res.status(200).json(movieDetail); 
    } catch (error) {
        next(error); 
    }
}

async function getMovieByName(req, res, next) {
    try {
        const movieName = req.params.movieName; 
        const movie = await Movie.findOne({ name: movieName });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getMovieByName
};

async function searchMovies(req, res, next) {
    console.log(req);
    try {
        const { q, type } = req.query;
        if (!q) {
            return res.status(400).json({ status: 400, message: "Missing required query parameter: q" });
        }

        const query = { movieNameEnglish: { $regex: '^' + q, $options: 'i' } };
        const movies = await Movie.find(query).populate("promotionId types");

        const resultList = movies.map(m => ({
            _id: m._id,
            movieNameEnglish: m.movieNameEnglish,
            movieNameVn: m.movieNameVn,
            director: m.director,
            actor: m.actor,
            duration: m.duration,
            fromDate: new Date(m.fromDate).toDateString('en-GB'),
            toDate: new Date(m.toDate).toDateString('en-GB'),
            content: m.content,
            largeImage: m.largeImage,
            smallImage: m.smallImage,
            movieProductionCompany: m.movieProductionCompany,
            promotionId: m.promotionId?.map(p => p.title),
            types: m.types?.map(t => t.typeName),
            deleted: m.deleted
        }));

        res.status(200).json(resultList);
    } catch (error) {
        next(error);
    }
}

const MovieController = {
    createMovie,
    editMovie,
    listMovies,
    getMovieById,
    deleteMovie,
    nowShowingMovies,
    comingSoonMovies,
    getMovieDetail,
    getMovieByName,
    searchMovies
}

module.exports = MovieController;
