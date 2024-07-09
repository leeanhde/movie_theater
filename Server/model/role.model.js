const mongoose = require("mongoose");
const {Schema} = mongoose;

const roleSchema = new Schema({
    name: String
});

const Role = mongoose.model('role', roleSchema);

module.exports = Role;