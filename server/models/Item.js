const mongoose = require("mongoose");

const itemShema = new mongoose.Schema(
  {
    itemCode: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemShema);
