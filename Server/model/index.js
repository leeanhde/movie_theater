const mongoose = require("mongoose");
const Genre = require('./genre.model')
const Guest = require('./guest.model');
const History = require('./history.model')
const Movies = require('./movies.model')
const Role = require('./role.model');
const Ticket = require('./ticket.model')
const User = require('./user.model')
// Khai bao doi tuong mongoose su dung nhu moi bien global
mongoose.Promise = global.Promise;
// Khai bao 1 doi tuong dai dien db
const db = {};
// Bo sung cac thuoc tinh cho db
db.mongoose = mongoose;
db.genre = Genre;
db.guset = Guest;
db.histori = History;
db.movies = Movies; 
db.role = Role;
db.ticket = Ticket; 
db.user = User;

db.connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
        .then(() => console.log("Connect to mongodb success"))
        .catch(error => console.error(error.message))
}

module.exports = db;