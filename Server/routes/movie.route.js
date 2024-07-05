const express = require('express');
const bodyParser = require('body-parser');
const MovieController = require('../controller/movie.controller');

const movieRouter = express.Router();
movieRouter.use(bodyParser.json());

movieRouter.post('/create', MovieController.createMovie);
movieRouter.get('/movielist', MovieController.list);
// movieRouter.put('/updatemovie', MovieController.edit);
// movieRouter.delete('/deletemovie', MovieController.deleteMovie);

module.exports = movieRouter;
