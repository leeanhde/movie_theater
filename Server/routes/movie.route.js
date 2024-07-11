const express = require('express');
const bodyParser = require('body-parser');
const MovieController = require('../controller/movie.controller');

const movieRouter = express.Router();
movieRouter.use(bodyParser.json());

movieRouter.post('/create', MovieController.createMovie);
movieRouter.get('/movielist', MovieController.listMovies);
movieRouter.get('/nowshowing', MovieController.nowShowingMovies);
movieRouter.get('/comingsoon', MovieController.comingSoonMovies);
movieRouter.get('/:id', MovieController.getMovieById);
movieRouter.put('/update/:id', MovieController.editMovie);
movieRouter.delete('/delete/:id', MovieController.deleteMovie);
movieRouter.get('/detail/:id', MovieController.getMovieDetail);

module.exports = movieRouter;
