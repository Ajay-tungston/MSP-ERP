const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
    unique: true,
  },
  rcNo: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Pickup", vehicleSchema);
