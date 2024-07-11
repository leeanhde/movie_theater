const express = require('express');
const bodyParser = require('body-parser');
const FoodController = require('../controller/food.controller');

const foodRouter = express.Router();
foodRouter.use(bodyParser.json());

foodRouter.post('/create', FoodController.createFood);
foodRouter.get('/list', FoodController.listFoods);

module.exports = foodRouter;
