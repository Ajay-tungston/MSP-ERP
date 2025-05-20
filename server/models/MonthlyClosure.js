const mongoose = require("mongoose");

const monthlyClosureSchema = new mongoose.Schema({
  month: {
    type: String, // Format: "2024-12"
    required: true,
    unique: true
  },
  totals: {
    purchase: { type: Number, default: 0 },
    sale: { type: Number, default: 0 },
    commissionPaid: { type: Number, default: 0 },
    marketFee: { type: Number, default: 0 },
    paymentIn: { type: Number, default: 0 },
    paymentOut: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MonthlyClosure", monthlyClosureSchema);
