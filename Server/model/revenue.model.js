const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
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
  timestamps: true // This option adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Revenue', revenueSchema);