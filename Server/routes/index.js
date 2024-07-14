const movieRouter = require('./movie.route');
const TypeRouter = require('./type.route');
const PromotionRouter = require('./promotion.route');
const CinemaRouter = require('./cinemaRoom.route')
const FoodRouter = require('./food.route')
const VnpayRouter = require('./vnpay.route')
module.exports = {
    movieRouter,
    TypeRouter,
    PromotionRouter,
    CinemaRouter,
    FoodRouter,
    VnpayRouter
};