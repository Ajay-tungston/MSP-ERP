
const mongoose = require("mongoose");

const lenderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, default: "" },
  openingBalance: { type: Number, default: 0 }, // ✅ Add this line
}, { timestamps: true });

module.exports = mongoose.model("Lender", lenderSchema);
