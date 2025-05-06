const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  expense: {
    type: String,
    required: true,
    minlength: 5
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: "Date cannot be in the future."
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
