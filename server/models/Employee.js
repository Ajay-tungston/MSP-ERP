const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true,
    unique: true 
},
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  whatsapp: {
    type: String,
    trim: true,
  },
  openingBalance: {
    type: Number,
    default: 0,
  },
  advance:{
    type:Number,
    default:0,
  },
  loan:{
    type:Number,
    default:0,
  },
  joiningDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  salary: {
    type: Number,
    required: true,
  },
  salaryType: { type: String, enum: ["monthly", "daily"], required: true },
},{
  timestamps: true,
}
);

module.exports = mongoose.model('Employee', employeeSchema);


