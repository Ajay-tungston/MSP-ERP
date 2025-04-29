const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  date: {
    type: String, // Stored as "DD/MM/YYYY"
    required: true,
  },
  companyCapital: {
    type: Number,
    required: true,
  },
  openingCash: {
    type: Number,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Company", CompanySchema);
