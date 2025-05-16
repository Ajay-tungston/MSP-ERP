const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  route: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  licenseNo: { type: String, required: true },
  rate: { type: Number, required: true },
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
}, { timestamps: true });

module.exports = mongoose.model('Pickup', pickupSchema);
