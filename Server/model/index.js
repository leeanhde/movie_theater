const mongoose = require("mongoose");
const Movie = require('./movie.model');
const Schedule = require('./schedule.model');
const Type = require('./type.model');
const User = require('./user.model');
const Promotion = require('./promotion.model');
const CinemaRoom = require('./cinemaRoom.model');
const Booking = require('./booking.model');
const Feedback = require('./feedback.model');
const Revenue = require('./revenue.model');
const Seat = require('./seat.model');
const Role = require('./role.model');




// Khai bao doi tuong mongoose su dung nhu moi bien global
mongoose.Promise = global.Promise;
// Khai bao 1 doi tuong dai dien db
const db = {};
// Bo sung cac thuoc tinh cho db
db.mongoose = mongoose;
db.movie = Movie;
db.schedule = Schedule;
db.type = Type;
db.user = User;
db.promotion = Promotion;
db.cinemaroom = CinemaRoom;
db.booking = Booking;
db.feedback = Feedback;
db.revenue = Revenue;
db.seat = Seat;
db.role = Role;

db.connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("Connect to mongodb success"))
    .catch((error) => console.error(error.message));
};

module.exports = db;
