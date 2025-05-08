const mongoose = require("mongoose");

const itemShema = new mongoose.Schema(
  {
    itemCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    conversionRatio: {
      type: Number, //  1 box = X kg
      required: true,
      default: 30, // Default conversion ratio (1 box = 30 kg)
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemShema);
