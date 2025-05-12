const mongoose = require("mongoose");

const lenderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required:false },

},
{
  timestamps: true,
});

module.exports = mongoose.model("Lender", lenderSchema);
