const mongoose = require("mongoose");
const { Schema } = mongoose;

const revenueSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  totalTicketSales: {
    type: Number,
    required: true
  },
  totalSnackSales: {
    type: Number,
    required: true
  }
}, {
  timestamps: true 
});

const Revenue = mongoose.model('revenue', revenueSchema);

module.exports = Revenue;
